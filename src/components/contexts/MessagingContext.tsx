import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { clone, mapMessageData, mapUserData } from "../../utils/helpers";
import {
    messagesFetcher,
    chatsFetcher,
    createChat,
} from "../../utils/services";
import {
    EChatTypes,
    ESocketEvents,
    IChatMessage,
    IMessagingContextState,
    IUser,
} from "../../utils/types";
import useSocket from "../hooks/useSocket";
import AuthContext from "./AuthContext";
import NotificationContext from "./NotificationContext";

const messagingContextInitialState: IMessagingContextState = {
    chats: [],
    usersTypingHashTable: {},
    messages: [],
    setUserIsTyping: (...args) => undefined,
    sendMessage: (...args) => undefined,
    updateMessage: (...args) => undefined,
    deleteMessage: (...args) => undefined,
    restoreMessage: (...args) => undefined,
    setInspectedChat: (...args) => undefined,
    contactUser: (...args) => undefined,
    chatsLoading: false,
    messagesLoading: false,
    chatsError: null,
    messagesError: null,
};

const MessagingContext = createContext(messagingContextInitialState);

export default MessagingContext;

export const MessagingContextProvider: React.FC = ({ children }) => {
    const [usersTypingHashTable, setUsersTypingHashTable] = useState({});
    const [inspectedChatId, setInspectedChatId] = useState(null);
    const [userIsTyping, setUserIsTyping] = useState(false);

    const { user } = useContext(AuthContext);
    const { createSnackbar } = useContext(NotificationContext);

    const router = useRouter();

    const {
        data: chats,
        isValidating: chatsLoading,
        revalidate: refetchChats,
        mutate: mutateChats,
        error: chatsError,
    } = useSWR(user && `/chats`, chatsFetcher());

    const {
        data: messages,
        mutate: mutateMessages,
        isValidating: messagesLoading,
        error: messagesError,
    } = useSWR(
        inspectedChatId ? `/chats/${inspectedChatId}/messages` : null,
        messagesFetcher(inspectedChatId as string)
    );

    useEffect(
        function () {
            socket?.emit(
                userIsTyping
                    ? ESocketEvents.CHAT_USER_STARTED_TYPING
                    : ESocketEvents.CHAT_USER_STOPPED_TYPING,
                { user, chatId: inspectedChatId }
            );
        },
        [userIsTyping]
    );

    const { socket } = useSocket(
        chats?.length &&
            (() =>
                function (socket: SocketIOClient.Socket) {
                    chats.forEach(function (chat) {
                        socket.emit(ESocketEvents.JOIN_ROOM, chat._id);
                    });
                    socket.on(
                        ESocketEvents.CHAT_USER_STARTED_TYPING,
                        function ({ user, chatId }) {
                            handleUserStartedTyping(mapUserData(user), chatId);
                        }
                    );

                    socket.on(
                        ESocketEvents.CHAT_USER_STOPPED_TYPING,
                        function ({ user, chatId }) {
                            handleUserStoppedTyping(mapUserData(user), chatId);
                        }
                    );

                    socket.on(
                        ESocketEvents.CHAT_MESSAGE_CREATED,
                        function ({ message, chatId }) {
                            handleMessageCreated(
                                mapMessageData(message),
                                chatId
                            );
                            mutateChats(function (prevChats) {
                                let newChats = clone(prevChats || chats);
                                const updatedChatIndex = newChats.findIndex(
                                    (chat) => chat._id === chatId
                                );
                                newChats[
                                    updatedChatIndex
                                ].lastMessageSentAt = new Date().toString();
                                newChats.sort(
                                    (a, b) =>
                                        new Date(
                                            b.lastMessageSentAt
                                        ).getTime() -
                                        new Date(a.lastMessageSentAt).getTime()
                                );
                                return newChats;
                            });
                        }
                    );

                    socket.on(
                        ESocketEvents.CHAT_MESSAGE_UPDATED,
                        function ({ message, chatId }) {
                            handleMessageUpdated(
                                mapMessageData(message),
                                chatId
                            );
                        }
                    );

                    socket.on(
                        ESocketEvents.CHAT_MESSAGE_DELETED,
                        function ({ message, chatId }) {
                            handleMessageUpdated(
                                mapMessageData(message),
                                chatId
                            );
                        }
                    );

                    socket.on(
                        ESocketEvents.CHAT_MESSAGE_RESTORED,
                        function ({ message, chatId }) {
                            handleMessageUpdated(
                                mapMessageData(message),
                                chatId
                            );
                        }
                    );
                })
    );

    function sendMessage(data: { text: string; chatId: string }) {
        socket.emit(ESocketEvents.CHAT_MESSAGE_CREATED, data);
    }

    function updateMessage(data: {
        text: string;
        messageId: string;
        chatId: string;
    }) {
        socket.emit(ESocketEvents.CHAT_MESSAGE_UPDATED, data);
    }

    function deleteMessage(data: { chatId: string; messageId: string }) {
        socket.emit(ESocketEvents.CHAT_MESSAGE_DELETED, data);
    }

    function restoreMessage(data: { chatId: string; messageId: string }) {
        socket.emit(ESocketEvents.CHAT_MESSAGE_RESTORED, data);
    }

    function handleMessageCreated(newMessage: IChatMessage, chatId: string) {
        if (newMessage.meta.from !== user._id && chatId !== inspectedChatId)
            createSnackbar({
                text: `New message: ${newMessage.text}`,
                type: "info",
            });
        mutate(
            `/chats/${chatId}/messages`,
            (prevMessages) => {
                const newMessages = clone(prevMessages || messages);
                newMessages.unshift(newMessage);
                return newMessages;
            },
            false
        );
    }

    function handleMessageUpdated(
        updatedMessage: IChatMessage,
        chatId: string
    ) {
        mutate(
            `/chats/${chatId}/messages`,
            (prevMessages) => {
                const newMessages = clone(prevMessages || messages);
                const messageIndex = newMessages.findIndex(
                    (message) => message?._id === updatedMessage?._id
                );
                newMessages[messageIndex] = updatedMessage;
                return newMessages;
            },
            false
        );
    }

    function handleUserStartedTyping(typingUser: IUser, chatId: string) {
        if (user._id === typingUser._id) return;
        setUsersTypingHashTable(function (prev) {
            const newTypingUsers = clone(prev);
            if (!newTypingUsers[chatId]) newTypingUsers[chatId] = [];
            newTypingUsers[chatId].push(typingUser.fullName);
            return newTypingUsers;
        });
    }

    function handleUserStoppedTyping(typingUser: IUser, chatId: string) {
        if (user._id === typingUser._id) return;
        setUsersTypingHashTable(function (prev) {
            const newTypingUsers = clone(prev);
            newTypingUsers[chatId] = newTypingUsers[chatId]?.filter(
                (fullName) => fullName !== typingUser.fullName
            );
            return newTypingUsers;
        });
    }

    async function contactUser(userId: string) {
        const { data: chat } = await createChat({
            meta: { users: [user._id, userId] },
            type: EChatTypes.PRIVATE,
        });
        refetchChats();
        // replace is the same as push, only it doesn't place the url
        // on the history stack. This makes it so that the back button
        // redirects to where this function was called, not to the contact user url below.
        router.replace(`/app/messaging?id=${chat._id}`);
    }

    return (
        <MessagingContext.Provider
            value={{
                chats,
                chatsLoading,
                sendMessage,
                deleteMessage,
                restoreMessage,
                updateMessage,
                usersTypingHashTable,
                messages,
                setUserIsTyping,
                contactUser,
                messagesLoading,
                chatsError,
                messagesError,
                setInspectedChat: setInspectedChatId,
            }}
        >
            {children}
        </MessagingContext.Provider>
    );
};

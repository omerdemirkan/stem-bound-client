import { createContext, useContext, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { clone, mapMessageData, mapUserData } from "../../utils/helpers";
import { messagesFetcher, userChatsFetcher } from "../../utils/services";
import {
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
    chatsLoading: false,
    usersTypingHashTable: {},
    messages: [],
    setUserIsTyping: (...args) => undefined,
    sendMessage: (...args) => undefined,
    updateMessage: (...args) => undefined,
    deleteMessage: (...args) => undefined,
    restoreMessage: (...args) => undefined,
    setInspectedChat: (...args) => undefined,
};

const MessagingContext = createContext(messagingContextInitialState);

export default MessagingContext;

export const MessagingContextProvider: React.FC = ({ children }) => {
    const [usersTypingHashTable, setUsersTypingHashTable] = useState({});
    const [inspectedChatId, setInspectedChatId] = useState(null);
    const [userIsTyping, setUserIsTyping] = useState(false);

    const { user } = useContext(AuthContext);
    const { createSnackbar } = useContext(NotificationContext);

    const { data: chats, isValidating: chatsLoading } = useSWR(
        user && `/chats`,
        userChatsFetcher(user?._id)
    );

    const { data: messages, mutate: mutateMessages } = useSWR(
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
                }),
        [
            ESocketEvents.CHAT_MESSAGE_CREATED,
            ESocketEvents.CHAT_MESSAGE_DELETED,
            ESocketEvents.CHAT_MESSAGE_RESTORED,
            ESocketEvents.CHAT_MESSAGE_UPDATED,
            ESocketEvents.CHAT_USER_STARTED_TYPING,
            ESocketEvents.CHAT_USER_STOPPED_TYPING,
        ]
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
                setInspectedChat: setInspectedChatId,
            }}
        >
            {children}
        </MessagingContext.Provider>
    );
};

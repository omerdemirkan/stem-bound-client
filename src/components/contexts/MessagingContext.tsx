import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { mutate } from "swr";
import { clone, mapMessageData, mapUserData } from "../../utils/helpers";
import {
    createChat,
    chatsFetcherInfinite,
    messagesFetcherInfinite,
} from "../../utils/services";
import {
    EChatTypes,
    ESocketEvents,
    IChat,
    IChatMessage,
    IMessagingContextState,
    IUser,
} from "../../utils/types";
import useInfiniteFetch from "../../hooks/useInfiniteFetch";
import useSocket from "../../hooks/useSocket";
import AuthContext from "./AuthContext";
import NotificationContext from "./NotificationContext";
import useGetCurrentValue from "../../hooks/useGetCurrentValue";

const messagingContextInitialState: IMessagingContextState = {
    chats: [],
    inspectedChat: null,
    usersTyping: [],
    messages: [],
    setUserIsTyping: (...args) => undefined,
    sendMessage: (...args) => undefined,
    updateMessage: (...args) => undefined,
    deleteMessage: (...args) => undefined,
    restoreMessage: (...args) => undefined,
    setInspectedChatId: (...args) => undefined,
    contactUser: (...args) => undefined,
    loadMoreMessages: (...args) => undefined,
    loadMoreChats: (...args) => undefined,
    refetchChats: (...args) => undefined,
    refetchMessages: (...args) => undefined,
    chatsLoading: false,
    messagesLoading: false,
    chatsError: null,
    messagesError: null,
    hasMoreChats: true,
    hasMoreMessages: true,
};

const MessagingContext = createContext(messagingContextInitialState);

export default MessagingContext;

export const MessagingContextProvider: React.FC = ({ children }) => {
    const [usersTyping, setUsersTyping] = useState<string[]>([]);
    const [inspectedChatId, setInspectedChatId] = useState(null);
    const [userIsTyping, setUserIsTyping] = useState(false);

    const { user } = useContext(AuthContext);
    const { createSnackbar } = useContext(NotificationContext);

    const router = useRouter();

    const {
        data: chats,
        isLoadingMore: chatsLoading,
        revalidate: refetchChats,
        mutate: mutateChats,
        error: chatsError,
        loadMore: loadMoreChats,
        hasMore: hasMoreChats,
    } = useInfiniteFetch(user && "/chats", chatsFetcherInfinite());

    const {
        data: messages,
        mutate: mutateMessages,
        isLoadingMore: messagesLoading,
        error: messagesError,
        loadMore: loadMoreMessages,
        hasMore: hasMoreMessages,
        revalidate: refetchMessages,
    } = useInfiniteFetch(
        user && inspectedChatId ? `/chats/${inspectedChatId}/messages` : null,
        messagesFetcherInfinite(inspectedChatId as string)
    );

    const getCurrentChats = useGetCurrentValue(chats);
    const getCurrentMessages = useGetCurrentValue(messages);

    const { socket } = useSocket(
        function (socket: SocketIOClient.Socket) {
            socket.on(
                ESocketEvents.CHAT_USER_STARTED_TYPING,
                ({ user, chatId }) =>
                    handleUserStartedTyping(mapUserData(user), chatId)
            );

            socket.on(
                ESocketEvents.CHAT_USER_STOPPED_TYPING,
                ({ user, chatId }) =>
                    handleUserStoppedTyping(mapUserData(user), chatId)
            );

            socket.on(
                ESocketEvents.CHAT_MESSAGE_CREATED,
                ({ message, chatId }) =>
                    handleMessageCreated(mapMessageData(message), chatId)
            );

            socket.on(
                ESocketEvents.CHAT_MESSAGE_UPDATED,
                ({ message, chatId }) =>
                    handleMessageUpdated(mapMessageData(message), chatId)
            );

            socket.on(
                ESocketEvents.CHAT_MESSAGE_DELETED,
                ({ message, chatId }) =>
                    handleMessageUpdated(mapMessageData(message), chatId)
            );

            socket.on(
                ESocketEvents.CHAT_MESSAGE_RESTORED,
                ({ message, chatId }) =>
                    handleMessageUpdated(mapMessageData(message), chatId)
            );
        },
        [inspectedChatId]
    );

    useEffect(
        function () {
            if (chats?.length && socket?.connected)
                chats?.forEach(function (chat) {
                    socket.emit(ESocketEvents.JOIN_ROOM, chat._id);
                });
        },
        [chats?.length && socket?.connected]
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
        const newMessages = [newMessage, ...(getCurrentMessages() || [])];
        let newChats = clone(getCurrentChats());
        const updatedChatIndex = newChats.findIndex(
            (chat) => chat._id === chatId
        );
        newChats[updatedChatIndex].lastMessageSentAt = new Date().toString();
        newChats.sort(
            (a, b) =>
                new Date(b.lastMessageSentAt).getTime() -
                new Date(a.lastMessageSentAt).getTime()
        );

        mutate(`/chats/${chatId}/messages`, newMessages, false);
        mutateChats(newChats, false);
    }

    function handleMessageUpdated(
        updatedMessage: IChatMessage,
        chatId: string
    ) {
        const newMessages = clone(getCurrentMessages()) || [];
        const messageIndex = newMessages.findIndex(
            (message) => message?._id === updatedMessage?._id
        );
        newMessages[messageIndex] = updatedMessage;

        mutate(`/chats/${chatId}/messages`, newMessages, false);
    }

    function handleUserStartedTyping(typingUser: IUser, chatId: string) {
        if (user._id === typingUser._id) return;
        setUsersTyping((prev) => [...prev, typingUser.fullName]);
    }

    function handleUserStoppedTyping(typingUser: IUser, chatId: string) {
        if (user._id === typingUser._id) return;
        setUsersTyping((prev) =>
            prev.filter((fullName) => typingUser.fullName !== fullName)
        );
    }

    async function contactUser(userId: string): Promise<IChat> {
        const { data: chat } = await createChat({
            meta: { users: [user._id, userId] },
            type: EChatTypes.PRIVATE,
        });
        refetchChats();
        // replace is the same as push, only it doesn't place the url
        // on the history stack. This makes it so that the back button
        // redirects to where this function was called, not to the contact user url below.
        router.replace(`/app/messaging?id=${chat._id}`);
        setInspectedChatId(chat._id);
        return chat;
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
                messages,
                setUserIsTyping,
                contactUser,
                messagesLoading,
                chatsError,
                messagesError,
                setInspectedChatId,
                usersTyping,
                loadMoreChats,
                loadMoreMessages,
                hasMoreMessages,
                hasMoreChats,
                refetchChats,
                refetchMessages,
                inspectedChat: chats?.find(
                    (chat) => chat._id === inspectedChatId
                ),
            }}
        >
            {children}
        </MessagingContext.Provider>
    );
};

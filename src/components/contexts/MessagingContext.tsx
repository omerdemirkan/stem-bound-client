import { createContext, useContext } from "react";
import useSWR, { mutate } from "swr";
import { clone } from "../../utils/helpers";
import { userChatsFetcher } from "../../utils/services";
import {
    ESocketEvents,
    IChatMessage,
    IMessagingContextState,
} from "../../utils/types";
import useSocket from "../hooks/useSocket";
import AuthContext from "./AuthContext";

const messagingContextInitialState: IMessagingContextState = {
    chats: [],
    sendMessage: (...args) => undefined,
    updateMessage: (...args) => undefined,
    deleteMessage: (...args) => undefined,
    restoreMessage: (...args) => undefined,
    chatsLoading: false,
};

const MessagingContext = createContext(messagingContextInitialState);

export default MessagingContext;

export const MessagingContextProvider: React.FC = ({ children }) => {
    const { user } = useContext(AuthContext);
    const {
        data: chats,
        isValidating: chatsLoading,
        mutate: mutateChats,
    } = useSWR(`/chats`, userChatsFetcher(user._id));

    const { socket, reinitializeListeners } = useSocket(
        chats?.length &&
            (() =>
                function (socket: SocketIOClient.Socket) {
                    chats.forEach(function (chat) {
                        socket.emit(ESocketEvents.JOIN_ROOM, chat._id);
                    });
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
        mutate(
            `chats/${chatId}/messages`,
            function (prevMessages) {
                const newMessages = clone(prevMessages);
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
            `chats/${chatId}/messages`,
            function (prevMessages) {
                const newMessages = clone(prevMessages);
                const messageIndex = newMessages.findIndex(
                    (message) => message?._id === updatedMessage?._id
                );
                newMessages[messageIndex] = updatedMessage;
                return newMessages;
            },
            false
        );
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
            }}
        >
            {children}
        </MessagingContext.Provider>
    );
};

import AppLayout from "../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import Input from "../../components/ui/Input";
import ChatMessage from "../../components/ui/ChatMessage";
import AuthContext from "../../components/contexts/AuthContext";
import ChatCard from "../../components/ui/ChatCard";
import useSWR, { mutate } from "swr";
import useSocket from "../../components/hooks/useSocket";
import useDebounce from "../../components/hooks/useDebounce";
import { IChat, ESocketEvents, IUser, IMessage } from "../../utils/types";
import { useEffect, useState, useContext } from "react";
import { clone, mapMessageData } from "../../utils/helpers";
import { useRouter } from "next/router";
import { userChatsFetcher, messagesFetcher } from "../../utils/services";

const MessagingAppPage: React.FC = () => {
    const router = useRouter();

    const chatId = router.query.id;
    const messagesFetcherKey = chatId ? `/chats/${chatId}/messages` : null;

    const { user } = useContext(AuthContext);

    const { data: chats, isValidating: fetchChatsValidating } = useSWR(
        `/chats`,
        userChatsFetcher(user._id)
    );
    const { data: messages, mutate: mutateMessages } = useSWR(
        messagesFetcherKey,
        messagesFetcher(chatId as string),
        {
            initialData: chats?.find((chat) => chat._id === chatId)?.messages,
        }
    );

    const [editedMessageId, setEditedMessageId] = useState<null | string>(null);
    const [editedMessageText, setEditedMessageText] = useState<string>("");
    const [textField, setTextField] = useState<string>("");
    const [typingUsers, setTypingUsers] = useState<IUser[]>([]);

    const debouncedTextField = useDebounce(textField, 3000);

    const userIsTyping = debouncedTextField !== textField;

    const { socket } = useSocket(function (socket: SocketIOClient.Socket) {
        if (chatId) {
            socket.emit(ESocketEvents.JOIN_ROOM, chatId);
        }

        socket.on(ESocketEvents.CHAT_USER_STARTED_TYPING, function ({ user }) {
            setTypingUsers((prev) => [...prev, user]);
        });

        socket.on(ESocketEvents.CHAT_USER_STOPPED_TYPING, function ({ user }) {
            setTypingUsers((prev) => prev.filter((u) => u._id !== user._id));
        });

        socket.on(ESocketEvents.CHAT_MESSAGE_CREATED, function ({ message }) {
            const newMessage = mapMessageData(message);
            if (message.meta.from === user._id) {
                setTextField("");
            }
            handleMessageCreated(newMessage);
        });

        socket.on(ESocketEvents.CHAT_MESSAGE_UPDATED, function ({ message }) {
            const updatedMessage = mapMessageData(message);
            if (updatedMessage.meta.from === user._id) {
                setEditedMessageId(null);
                setEditedMessageText("");
            }
            handleMessageUpdated(updatedMessage);
        });

        socket.on(ESocketEvents.CHAT_MESSAGE_DELETED, function ({ message }) {
            console.log("deleted: ", message);
            const newMessage = mapMessageData(message);
            handleMessageUpdated(newMessage);
        });

        socket.on(ESocketEvents.CHAT_MESSAGE_RESTORED, function ({ message }) {
            console.log("restored: ", message);
            const newMessage = mapMessageData(message);
            handleMessageUpdated(newMessage);
        });
    });

    useEffect(
        function () {
            socket?.emit(
                userIsTyping
                    ? ESocketEvents.CHAT_USER_STARTED_TYPING
                    : ESocketEvents.CHAT_USER_STOPPED_TYPING,
                { user, chatId }
            );
        },
        [userIsTyping]
    );

    useEffect(
        function () {
            if (editedMessageId) {
                setEditedMessageText(
                    messages.find((message) => message._id === editedMessageId)
                        .text
                );
            } else {
                setEditedMessageText("");
            }
        },
        [editedMessageId]
    );

    useEffect(
        function () {
            setTextField("");
            setEditedMessageId(null);
            setEditedMessageText("");
            setTypingUsers([]);
        },
        [chatId]
    );

    // API CALL FUNCTIONS

    function handleSendMessage() {
        socket.emit(ESocketEvents.CHAT_MESSAGE_CREATED, {
            chatId,
            text: textField,
        });
    }

    function handleUpdateMessage() {
        socket.emit(ESocketEvents.CHAT_MESSAGE_UPDATED, {
            chatId,
            messageId: editedMessageId,
            text: editedMessageText,
        });
    }

    function handleDeleteMessage(messageId: string) {
        socket.emit(ESocketEvents.CHAT_MESSAGE_DELETED, {
            chatId,
            messageId,
        });
    }

    function handleRestoreMessage(messageId: string) {
        socket.emit(ESocketEvents.CHAT_MESSAGE_RESTORED, {
            chatId,
            messageId,
        });
    }

    // CHAT STATE UPDATE HELPERS

    function handleInspectChat(id: string) {
        if (chatId) {
            socket.emit(ESocketEvents.LEAVE_ROOM, chatId);
        }
        socket.emit(ESocketEvents.JOIN_ROOM, id);
        router.push(
            { pathname: router.pathname, query: { id } },
            { pathname: router.pathname, query: { id } },
            { shallow: true }
        );
    }

    function handleMessageCreated(newMessage: IMessage) {
        mutateMessages(function (previous) {
            const newMessages = clone(previous);
            newMessages.unshift(newMessage);
            return newMessages;
        }, false);
    }

    function handleMessageUpdated(updatedMessage: IMessage) {
        mutateMessages(function (prevMessages) {
            const newMessages = clone(prevMessages);
            const messageIndex = newMessages.findIndex(
                (message) => message._id === updatedMessage._id
            );
            newMessages[messageIndex] = updatedMessage;
            return newMessages;
        }, false);
    }

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - Messaging</title>
            </Head>
            <h4>messaging</h4>
            {!fetchChatsValidating && !chats?.length ? <h6>No chats</h6> : null}
            {chats?.map((chat: IChat) => (
                <ChatCard
                    chat={chat}
                    handleInspect={handleInspectChat}
                    key={chat._id}
                />
            ))}
            {messages ? (
                <>
                    <h4>Inspected Chat:</h4>
                    {editedMessageId ? (
                        <button onClick={() => setEditedMessageId(null)}>
                            CANCEL EDIT
                        </button>
                    ) : null}
                    {messages.map((message) => (
                        <ChatMessage
                            message={message}
                            key={message._id}
                            onSetEdit={setEditedMessageId}
                            onDelete={handleDeleteMessage}
                            onRestore={handleRestoreMessage}
                        />
                    ))}
                    <Input
                        type="text"
                        id="message-text-field"
                        onChange={
                            editedMessageId
                                ? setEditedMessageText
                                : (text) => setTextField(text)
                        }
                        value={editedMessageId ? editedMessageText : textField}
                        eventTargetValue
                    />

                    {editedMessageId ? (
                        <button onClick={handleUpdateMessage}>EDIT</button>
                    ) : (
                        <button onClick={handleSendMessage}>SEND</button>
                    )}
                </>
            ) : null}

            {typingUsers.map((user) => (
                <div key={user._id}>{user.firstName} is typing...</div>
            ))}
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(MessagingAppPage);

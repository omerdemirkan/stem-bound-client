import AppLayout from "../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import Input from "../../components/ui/Input";
import ChatMessage from "../../components/ui/ChatMessage";
import AuthContext from "../../components/contexts/AuthContext";
import ChatCard from "../../components/ui/ChatCard";
import useSWR from "swr";
import useSocket from "../../components/hooks/useSocket";
import { IChat, ESocketEvents, IUser, IMessage } from "../../utils/types";
import { useEffect, useState, useContext } from "react";
import { clone } from "../../utils/helpers";
import { useRouter } from "next/router";
import {
    userChatsFetcher,
    chatFetcher,
    createMessage,
    updateMessage,
    deleteMessage,
    restoreMessage,
} from "../../utils/services";
import useDebounce from "../../components/hooks/useDebounce";

const MessagingAppPage: React.FC = () => {
    const router = useRouter();
    const chatId = router.query.id;
    const { user } = useContext(AuthContext);

    const { data: chats } = useSWR(`/chats`, userChatsFetcher(user._id));
    const { data: inspectedChat, mutate: mutateInspectedChat } = useSWR(
        chatId ? `/chats/${chatId}` : null,
        chatFetcher(chatId as string),
        { initialData: chats?.find((chat) => chat._id === chatId) }
    );

    const [editedMessageId, setEditedMessageId] = useState<null | string>(null);
    const [editedMessageText, setEditedMessageText] = useState<string>("");
    const [textField, setTextField] = useState<string>("");
    const [typingUsers, setTypingUsers] = useState<IUser[]>([]);

    const debouncedTextField = useDebounce(textField, 3000);

    const userIsTyping = debouncedTextField !== textField;

    const { socket } = useSocket(function (socket: SocketIOClient.Socket) {
        socket.emit(ESocketEvents.JOIN_ROOM, chatId);

        socket.on(ESocketEvents.CHAT_USER_STARTED_TYPING, function ({ user }) {
            setTypingUsers((prev) => [...prev, user]);
        });

        socket.on(ESocketEvents.CHAT_USER_STOPPED_TYPING, function ({ user }) {
            setTypingUsers((prev) => prev.filter((u) => u._id !== user._id));
        });

        socket.on(ESocketEvents.CHAT_MESSAGE_CREATED, function ({ message }) {
            handleMessageCreated(message);
        });
        socket.on(ESocketEvents.CHAT_MESSAGE_UPDATED, function ({ message }) {
            handleMessageUpdated(message);
        });
        socket.on(ESocketEvents.CHAT_MESSAGE_DELETED, function ({ message }) {
            handleMessageDeleted(message);
        });
        socket.on(ESocketEvents.CHAT_MESSAGE_RESTORED, function ({ message }) {
            handleMessageUpdated(message);
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
                    inspectedChat.messages.find(
                        (message) => message._id === editedMessageId
                    ).text
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

    async function handleSendMessage() {
        await createMessage({
            chatId: inspectedChat._id,
            text: textField,
        });
        setTextField("");
    }

    async function handleUpdateMessage() {
        await updateMessage({
            chatId: inspectedChat._id,
            messageId: editedMessageId,
            text: editedMessageText,
        });
        setEditedMessageId(null);
        setEditedMessageText("");
    }

    async function handleDeleteMessage(messageId: string) {
        await deleteMessage({ chatId: inspectedChat._id, messageId });
    }

    async function handleRestoreMessage(messageId: string) {
        await restoreMessage({
            chatId: inspectedChat._id,
            messageId,
        });
    }

    // CHAT STATE UPDATE HELPERS

    function handleInspectChat(id: string) {
        socket.emit(ESocketEvents.LEAVE_ROOM, chatId);
        socket.emit(ESocketEvents.JOIN_ROOM, id);
        router.push(
            { pathname: router.pathname, query: { id } },
            { pathname: router.pathname, query: { id } },
            {
                shallow: true,
            }
        );
    }

    function handleMessageCreated(newMessage: IMessage) {
        mutateInspectedChat(function (previous) {
            const newInspectedChat = clone(previous);
            newInspectedChat.messages.unshift(newMessage);
            return newInspectedChat;
        }, false);
    }

    function handleMessageUpdated(updatedMessage: IMessage) {
        mutateInspectedChat(function (previous) {
            const newInspectedChat = clone(previous);
            const messageIndex = newInspectedChat.messages.findIndex(
                (message) => message._id === updatedMessage._id
            );
            newInspectedChat.messages[messageIndex] = updatedMessage;
            return newInspectedChat;
        }, false);
    }

    function handleMessageDeleted(messageId: string) {
        mutateInspectedChat(function (previous) {
            const newInspectedChat = clone(previous);
            const messageIndex = newInspectedChat.messages.findIndex(
                (message) => message._id === messageId
            );
            const deletedMessage = newInspectedChat.messages[messageIndex];
            deletedMessage.isDeleted = true;
            deletedMessage.text = "This message was deleted";
            return newInspectedChat;
        }, false);
    }

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - Messaging</title>
            </Head>
            <h4>messaging</h4>
            {chats &&
                chats.map((chat: IChat) => (
                    <ChatCard
                        chat={chat}
                        handleInspect={handleInspectChat}
                        key={chat._id}
                    />
                ))}
            {inspectedChat ? (
                <>
                    <h4>Inspected Chat:</h4>
                    {editedMessageId ? (
                        <button onClick={() => setEditedMessageId(null)}>
                            CANCEL EDIT
                        </button>
                    ) : null}
                    {inspectedChat.messages.map((message) => (
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
                <div>{user.firstName} is typing...</div>
            ))}
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(MessagingAppPage);

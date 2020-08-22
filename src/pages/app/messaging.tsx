import AppLayout from "../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import Input from "../../components/ui/Input";
import ChatMessage from "../../components/ui/ChatMessage";
import AuthContext from "../../components/contexts/AuthContext";
import ChatCard from "../../components/ui/ChatCard";
import useSWR from "swr";
import useSocket from "../../components/hooks/useSocket";
import { IChat, ESocketEvents } from "../../utils/types";
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
    const [typingUsers, setTypingUsers] = useState<string[]>([]);

    const debouncedTextField = useDebounce(textField, 3000);

    const userIsTyping = debouncedTextField !== textField;

    const socket = useSocket(function (socket: SocketIOClient.Socket) {
        socket.emit(ESocketEvents.JOIN_ROOM, chatId);
        socket.on(ESocketEvents.CHAT_USER_STARTED_TYPING, function ({
            userId,
        }) {
            setTypingUsers((prev) => ({ ...prev, userId }));
        });
        socket.on(ESocketEvents.CHAT_USER_STOPPED_TYPING, function ({
            userId,
        }) {
            setTypingUsers(typingUsers.filter((id) => id !== userId));
        });
        return () => socket.emit(ESocketEvents.LEAVE_ROOM, chatId);
    });

    useEffect(
        function () {
            socket?.emit(
                userIsTyping
                    ? ESocketEvents.CHAT_USER_STARTED_TYPING
                    : ESocketEvents.CHAT_USER_STOPPED_TYPING,
                { userId: user._id, chatId: chatId }
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
        },
        [chatId]
    );

    function handleInspectChat(id: string) {
        router.push(
            { pathname: router.pathname, query: { id } },
            { pathname: router.pathname, query: { id } },
            {
                shallow: true,
            }
        );
    }

    function handleSendMessage() {
        createMessage({
            chatId: inspectedChat._id,
            text: textField,
        })
            .then(function (res) {
                const newInspectedChat = clone(inspectedChat);
                newInspectedChat.messages.unshift(res.data);
                mutateInspectedChat(newInspectedChat);
                setTextField("");
            })
            .catch(console.error);
    }

    function handleUpdateMessage() {
        updateMessage({
            chatId: inspectedChat._id,
            messageId: editedMessageId,
            text: editedMessageText,
        })
            .then(function (res) {
                const newInspectedChat = clone(inspectedChat);
                const messageIndex = newInspectedChat.messages.findIndex(
                    (message) => message._id === editedMessageId
                );
                newInspectedChat.messages[messageIndex] = res.data;
                mutateInspectedChat(newInspectedChat);
                setEditedMessageId(null);
                setEditedMessageText("");
            })
            .catch(console.error);
    }

    function handleDeleteMessage(messageId: string) {
        deleteMessage({ chatId: inspectedChat._id, messageId })
            .then(function (res) {
                const newInspectedChat = clone(inspectedChat);
                const messageIndex = newInspectedChat.messages.findIndex(
                    (message) => message._id === messageId
                );
                const deletedMessage = newInspectedChat.messages[messageIndex];
                deletedMessage.isDeleted = true;
                deletedMessage.text = "This message was deleted";
                mutateInspectedChat(newInspectedChat);
            })
            .catch(console.error);
    }

    function handleRestoreMessage(messageId: string) {
        restoreMessage({ chatId: inspectedChat._id, messageId })
            .then(function (res) {
                const newInspectedChat = clone(inspectedChat);
                const messageIndex = newInspectedChat.messages.findIndex(
                    (message) => message._id === messageId
                );
                newInspectedChat.messages[messageIndex] = res.data;
                mutateInspectedChat(newInspectedChat);
            })
            .catch(console.error);
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

            <pre>{JSON.stringify(typingUsers, null, 2)}</pre>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(MessagingAppPage);

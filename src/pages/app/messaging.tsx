import AppLayout from "../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import AuthContext from "../../components/contexts/AuthContext";
import useSWR from "swr";
import useSocket from "../../components/hooks/useSocket";
import useDebounce from "../../components/hooks/useDebounce";
import {
    ESocketEvents,
    IUser,
    IChatMessage,
    IBreadCrumb,
} from "../../utils/types";
import { useEffect, useState, useContext } from "react";
import { clone, mapMessageData } from "../../utils/helpers";
import { userChatsFetcher, messagesFetcher } from "../../utils/services";
import { useRouter } from "next/router";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import ChatList from "../../components/ui/ChatList";
import ChatFeed from "../../components/ui/ChatFeed";

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
        chatId ? messagesFetcherKey : null,
        messagesFetcher(chatId as string),
        {
            initialData: chats?.find((chat) => chat._id === chatId)?.messages,
        }
    );

    const inspectedChat = chats?.find((chat) => chat._id === chatId);

    const [editedMessageId, setEditedMessageId] = useState<null | string>(null);
    const [editedMessageText, setEditedMessageText] = useState<string>("");
    const [textField, setTextField] = useState<string>("");
    const [typingUsers, setTypingUsers] = useState<IUser[]>([]);

    const debouncedTextField = useDebounce(textField, 3000);

    const userIsTyping = textField && debouncedTextField !== textField;

    const { socket, reinitializeListeners } = useSocket(
        messages?.length &&
            (() =>
                function (socket: SocketIOClient.Socket) {
                    socket.emit(ESocketEvents.JOIN_ROOM, chatId);

                    const routerChatId = chatId;

                    socket.on(
                        ESocketEvents.CHAT_USER_STARTED_TYPING,
                        function ({ user, chatId }) {
                            if (chatId !== routerChatId) return;
                            setTypingUsers((prev) => [...prev, user]);
                        }
                    );

                    socket.on(
                        ESocketEvents.CHAT_USER_STOPPED_TYPING,
                        function ({ user, chatId }) {
                            if (chatId !== routerChatId) return;
                            setTypingUsers((prev) =>
                                prev.filter((u) => u._id !== user._id)
                            );
                        }
                    );

                    socket.on(ESocketEvents.CHAT_MESSAGE_CREATED, function ({
                        message,
                        chatId,
                    }) {
                        if (chatId !== routerChatId) return;
                        const newMessage = mapMessageData(message);
                        if (message.meta.from === user._id) {
                            setTextField("");
                        }
                        handleMessageCreated(newMessage);
                    });

                    socket.on(ESocketEvents.CHAT_MESSAGE_UPDATED, function ({
                        message,
                        chatId,
                    }) {
                        if (chatId !== routerChatId) return;
                        const updatedMessage = mapMessageData(message);
                        if (updatedMessage.meta.from === user._id) {
                            setEditedMessageId(null);
                            setEditedMessageText("");
                        }
                        handleMessageUpdated(updatedMessage);
                    });

                    socket.on(ESocketEvents.CHAT_MESSAGE_DELETED, function ({
                        message,
                        chatId,
                    }) {
                        if (chatId !== routerChatId) return;
                        const newMessage = mapMessageData(message);
                        handleMessageUpdated(newMessage);
                    });

                    socket.on(ESocketEvents.CHAT_MESSAGE_RESTORED, function ({
                        message,
                        chatId,
                    }) {
                        if (chatId !== routerChatId) return;
                        const newMessage = mapMessageData(message);
                        handleMessageUpdated(newMessage);
                    });
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
            reinitializeListeners();
        },
        [chatId]
    );

    // API CALL FUNCTIONS

    function handleSendMessage() {
        socket.emit(ESocketEvents.CHAT_MESSAGE_CREATED, {
            chatId,
            text: textField,
        });
        setTextField("");
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
        socket.emit(ESocketEvents.LEAVE_ROOM, chatId);
        socket.emit(ESocketEvents.JOIN_ROOM, id);
        router.push(
            { pathname: router.pathname, query: { id } },
            { pathname: router.pathname, query: { id } },
            { shallow: true }
        );
    }

    function handleMessageCreated(newMessage: IChatMessage) {
        mutateMessages(function (prevMessages) {
            const newMessages = clone(prevMessages || messages);
            newMessages.unshift(newMessage);
            return newMessages;
        }, false);
    }

    function handleMessageUpdated(updatedMessage: IChatMessage) {
        mutateMessages(function (prevMessages) {
            const newMessages = clone(prevMessages || messages);
            const messageIndex = newMessages.findIndex(
                (message) => message._id === updatedMessage._id
            );
            newMessages[messageIndex] = updatedMessage;
            return newMessages;
        }, false);
    }

    const breadCrumbs: IBreadCrumb[] = [
        { label: "Messaging", href: "/app/messaging", shallow: true },
    ];

    if (chatId && inspectedChat) {
        breadCrumbs.push({
            label: inspectedChat.name,
        });
    }

    return (
        <AppLayout
            breadCrumbs={breadCrumbs}
            footerEl={
                chatId && (
                    <TextField
                        variant="outlined"
                        autoFocus
                        fullWidth
                        multiline
                        helperText={editedMessageId && "Editing"}
                        placeholder={`Message ${inspectedChat?.name}`}
                        value={editedMessageId ? editedMessageText : textField}
                        onChange={(e) =>
                            (editedMessageId
                                ? setEditedMessageText
                                : setTextField)(e.target.value)
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {editedMessageId ? (
                                        <>
                                            <Button
                                                onClick={() =>
                                                    setEditedMessageId(null)
                                                }
                                                variant="outlined"
                                                color="primary"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleUpdateMessage}
                                                variant="contained"
                                                color="primary"
                                                style={{ marginLeft: "10px" }}
                                            >
                                                Edit
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            onClick={handleSendMessage}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Send
                                        </Button>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                )
            }
        >
            <Head>
                <title>STEM-bound - Messaging</title>
            </Head>
            {!fetchChatsValidating && !chats?.length ? <h6>No chats</h6> : null}
            <ChatList
                chats={chats}
                handleInspectChat={handleInspectChat}
                inspectedChatId={chatId as string}
            />
            <ChatFeed
                chatMessages={messages}
                chatPictureUrl={inspectedChat?.pictureUrl}
                isTyping={typingUsers.map((u) => u.firstName)}
            />
        </AppLayout>
    );
};

export default withAuth(MessagingAppPage);

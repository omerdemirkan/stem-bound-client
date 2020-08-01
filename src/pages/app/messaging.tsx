import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import Input from "../../components/ui/Input";
import ChatMessage from "../../components/ui/ChatMessage";
import useSocket from "../../components/hooks/useSocket";
import AuthContext from "../../components/contexts/AuthContext";
import ChatCard from "../../components/ui/ChatCard";
import { IStoreState, IChat } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import {
    fetchChatsAsync,
    fetchChatAsync,
    inspectChat,
    updateChatTextField,
    createChatMessageAsync,
    updateChatMessageAsync,
    deleteChatMessageAsync,
} from "../../store/chat";
import { useRouter } from "next/router";

const MessagingAppPage: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const {
        chat: {
            chats,
            inspectedChat,
            textField,
            status: { fetchChat: fetchChatStatus },
        },
    } = useSelector((state: IStoreState) => state);

    const chatId = router.query.id;

    const [editedMessageId, setEditedMessageId] = useState<null | string>(null);
    const [editedMessageText, setEditedMessageText] = useState<string>("");

    useEffect(function () {
        dispatch(fetchChatsAsync(user._id));
    }, []);

    useEffect(
        function () {
            if (chatId) {
                dispatch(
                    fetchChatAsync(chatId as any, {
                        skip: inspectedChat?.messages.length,
                        limit: 20,
                    })
                );
            }
        },
        [chatId]
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

    function handleInspectChat(chatId: string) {
        dispatch(inspectChat(chatId));
        dispatch(updateChatTextField(""));
        router.push(
            router.pathname,
            {
                query: { id: chatId },
            },
            { shallow: true }
        );
    }

    function handleSendMessage() {
        dispatch(
            createChatMessageAsync({
                chatId: inspectedChat._id,
                text: textField,
            })
        );
    }

    function handleUpdateMessage() {
        dispatch(
            updateChatMessageAsync(
                {
                    text: editedMessageText,
                    chatId: inspectedChat._id,
                    messageId: editedMessageId,
                },
                {
                    onSuccess() {
                        setEditedMessageId(null);
                        setEditedMessageText("");
                    },
                }
            )
        );
    }

    function handleDeleteMessage(messageId: string) {
        dispatch(
            deleteChatMessageAsync({ chatId: inspectedChat._id, messageId })
        );
    }

    return (
        <AppLayout>
            <h4>messaging</h4>
            {chats.map((chat: IChat) => (
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
                        />
                    ))}
                    <Input
                        type="text"
                        id="message-text-field"
                        onChange={
                            editedMessageId
                                ? setEditedMessageText
                                : (text) => dispatch(updateChatTextField(text))
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
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(MessagingAppPage);

import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import { IWithAuthProps, IStoreState, IChat } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    fetchChatsAsync,
    fetchChatAsync,
    inspectChat,
    updateChatTextField,
    createChatMessageAsync,
} from "../../store/chat";
import ChatCard from "../../components/ui/ChatCard";
import { useRouter } from "next/router";
import Input from "../../components/ui/Input";

const MessagingAppPage: React.FC<IWithAuthProps> = ({
    authAttempted,
    accessToken,
    user,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        chat: { chats, inspectedChat, textField },
    } = useSelector((state: IStoreState) => state);
    const chatId = router.query.id;

    useEffect(function () {
        dispatch(fetchChatsAsync(user._id));
    }, []);

    useEffect(
        function () {
            if (chatId) {
                dispatch(fetchChatAsync(chatId as any));
            }
        },
        [chatId]
    );

    function handleUpdateTextField(text: string) {
        dispatch(updateChatTextField(text));
    }

    function handleInspectChat(chatId: string) {
        dispatch(inspectChat(chatId));
        handleUpdateTextField("");
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
                messageData: {
                    text: textField,
                    meta: { from: user._id, readBy: [] },
                },
            })
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
            {inspectChat != null ? (
                <>
                    <h4>Inspected Chat:</h4>
                    <pre>{JSON.stringify(inspectedChat, null, 2)}</pre>
                    <Input
                        type="text"
                        id="message-text-field"
                        onChange={handleUpdateTextField}
                        eventTargetValue
                    />
                    <button onClick={handleSendMessage}>SEND</button>
                </>
            ) : null}
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(MessagingAppPage);

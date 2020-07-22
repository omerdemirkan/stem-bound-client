import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import { IWithAuthProps, IStoreState, IChat } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchChatsAsync, fetchChatAsync } from "../../store/chat";
import ChatCard from "../../components/ui/ChatCard";
import { useRouter } from "next/router";

const MessagingAppPage: React.FC<IWithAuthProps> = ({
    authAttempted,
    accessToken,
    user,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        chat: { chats, inspectedChat },
    } = useSelector((state: IStoreState) => state);

    const chatId = router.query.chatId;

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

    function handleInspectChat(chatId: string) {
        router.push(router.pathname, {
            query: { ...router.query, id: chatId },
        });
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
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(MessagingAppPage);

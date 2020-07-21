import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import { IWithAuthProps, IStoreState, IChat } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchChatsAsync } from "../../store/chat";
import ChatCard from "../../components/ui/ChatCard";

const MessagingAppPage: React.FC<IWithAuthProps> = ({
    authAttempted,
    accessToken,
    user,
}) => {
    const dispatch = useDispatch();
    const {
        chat: { chats },
    } = useSelector((state: IStoreState) => state);

    useEffect(function () {
        dispatch(fetchChatsAsync(user._id));
    }, []);

    return (
        <AppLayout>
            <h4>messaging</h4>
            {chats.map((chat: IChat) => (
                <ChatCard chat={chat} key={chat._id} />
            ))}
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(MessagingAppPage);

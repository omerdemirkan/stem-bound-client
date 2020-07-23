import { IChat } from "../../utils/types";

interface Props {
    chat: IChat;
    handleInspect: (chatId: string) => any;
}

const ChatCard: React.FC<Props> = ({ chat, handleInspect }) => {
    return (
        <div>
            <p onClick={() => handleInspect(chat._id)}>{chat._id}</p>
            <pre>{JSON.stringify(chat, null, 2)}</pre>
        </div>
    );
};

export default ChatCard;

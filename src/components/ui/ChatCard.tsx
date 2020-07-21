import { IChat } from "../../utils/types";

interface Props {
    chat: IChat;
}

const ChatCard: React.FC<Props> = ({ chat }) => {
    return (
        <div>
            <pre>{JSON.stringify(chat, null, 2)}</pre>
        </div>
    );
};

export default ChatCard;

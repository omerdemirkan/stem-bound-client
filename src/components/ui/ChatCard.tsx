import { IChat } from "../../utils/types";

interface Props {
    chat: IChat;
    handleInspect: (chatId: string) => any;
}

const ChatCard: React.FC<Props> = ({ chat, handleInspect }) => {
    return (
        <div onClick={() => handleInspect(chat._id)}>
            <img
                src={
                    chat.pictureUrl ||
                    (chat.isGroupChat
                        ? "/default-groupchat-picture.svg"
                        : "/default-profile-picture.svg")
                }
                alt="chat-image"
                className="profile-picture small"
            />
            <p>{chat.name}</p>
        </div>
    );
};

export default ChatCard;

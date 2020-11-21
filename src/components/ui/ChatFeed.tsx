import Typography from "@material-ui/core/Typography";
import { IChatMessage, IChatMessageEventHandlers } from "../../utils/types";
import { reverseMap, getChatMessageGroups } from "../../utils/helpers";
import ChatMessageGroup from "./ChatMessageGroup";
import InvertContainer from "./InvertContainer";
import InvertScroll from "./InvertScroll";

interface Props {
    chatMessages: IChatMessage[];
    chatId: string;
    chatPictureUrl?: string;
    isTyping?: string[];
    editedMessageId?: string;
    editedMessageText?: string;
}

const ChatFeed: React.FC<Props & IChatMessageEventHandlers> = ({
    chatMessages,
    chatId,
    chatPictureUrl,
    isTyping,
    editedMessageId,
    editedMessageText,
    ...chatMessageHandlers
}) => {
    const chatMessageGroups = getChatMessageGroups(chatMessages);

    return (
        <InvertScroll key={chatId}>
            {reverseMap(chatMessageGroups, (chatMessageGroup) => (
                <ChatMessageGroup
                    chatMessageGroup={chatMessageGroup}
                    key={chatMessageGroup.messages[0]._id}
                    editedMessageId={editedMessageId}
                    editedMessageText={editedMessageText}
                    {...chatMessageHandlers}
                />
            ))}
            {isTyping?.length ? (
                <Typography>
                    {isTyping.join(", ")} {isTyping.length > 1 ? "are" : "is"}{" "}
                    typing
                </Typography>
            ) : null}
        </InvertScroll>
    );
};

export default ChatFeed;

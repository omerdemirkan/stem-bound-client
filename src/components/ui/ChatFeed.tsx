import Typography from "@material-ui/core/Typography";
import { useEffect } from "react";
import { IChatMessage, IChatMessageEventHandlers } from "../../utils/types";
import { reverseMap, getChatMessageGroups } from "../../utils/helpers";
import ChatMessageGroup from "./ChatMessageGroup";

interface Props {
    chatMessages: IChatMessage[];
    chatPictureUrl?: string;
    isTyping?: string[];
    editedMessageId?: string;
    editedMessageText?: string;
}

const ChatFeed: React.FC<Props & IChatMessageEventHandlers> = ({
    chatMessages,
    chatPictureUrl,
    isTyping,
    editedMessageId,
    editedMessageText,
    ...chatMessageHandlers
}) => {
    const chatMessageGroups = getChatMessageGroups(chatMessages);

    useEffect(function () {
        const element = document.getElementById("chat-feed");
        element.scrollTop = element.scrollHeight;
    }, []);

    return (
        <div id="chat-feed">
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
        </div>
    );
};

export default ChatFeed;

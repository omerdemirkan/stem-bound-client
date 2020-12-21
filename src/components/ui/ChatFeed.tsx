import Typography from "@material-ui/core/Typography";
import {
    IChatMessage,
    IChatMessageEventHandlers,
    IChatMessageGroup,
} from "../../utils/types";
import { reverseMap, getChatMessageGroups } from "../../utils/helpers";
import ChatMessageGroup from "./ChatMessageGroup";
import InvertScroll from "./InvertScroll";
import { useEffect, useState } from "react";

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
    const [chatMessageGroups, setChatMessageGroups] = useState<
        IChatMessageGroup[]
    >();
    useEffect(
        function () {
            setChatMessageGroups(getChatMessageGroups(chatMessages));
        },
        [chatMessages]
    );

    return (
        <InvertScroll key={chatId}>
            {isTyping?.length ? (
                <Typography>
                    {isTyping.join(", ")} {isTyping.length > 1 ? "are" : "is"}{" "}
                    typing
                </Typography>
            ) : null}
            {chatMessageGroups?.map((chatMessageGroup) => (
                <ChatMessageGroup
                    chatMessageGroup={chatMessageGroup}
                    key={chatMessageGroup.messages[0]._id}
                    editedMessageId={editedMessageId}
                    editedMessageText={editedMessageText}
                    {...chatMessageHandlers}
                />
            ))}
        </InvertScroll>
    );
};

export default ChatFeed;

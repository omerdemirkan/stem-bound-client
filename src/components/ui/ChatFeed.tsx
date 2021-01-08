import Typography from "@material-ui/core/Typography";
import {
    IChatMessage,
    IChatMessageEventHandlers,
    IChatMessageGroup,
} from "../../utils/types";
import { getChatMessageGroups } from "../../utils/helpers";
import ChatMessageGroup from "./ChatMessageGroup";
import InvertScroll from "./InvertScroll";
import { useEffect, useState } from "react";
import useCompute from "../hooks/useCompute";

interface Props {
    chatMessages: IChatMessage[];
    chatId: string;
    chatPictureUrl?: string;
    isTyping?: string[];
    editedMessageId?: string;
    editedMessageText?: string;
    loading?: boolean;
    errorMessage?: string;
}

const ChatFeed: React.FC<Props & IChatMessageEventHandlers> = ({
    chatMessages,
    chatId,
    chatPictureUrl,
    isTyping,
    editedMessageId,
    editedMessageText,
    loading,
    errorMessage,
    ...chatMessageHandlers
}) => {
    const chatMessageGroups = useCompute(
        () => getChatMessageGroups(chatMessages),
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

import Typography from "@material-ui/core/Typography";
import { IChatMessage, IChatMessageEventHandlers } from "../../utils/types";
import { getChatMessageGroups } from "../../utils/helpers";
import ChatMessageGroup from "./ChatMessageGroup";
import InvertScroll from "../util/InvertScroll";
import PictureMessage from "./PictureMessage";
import EmptyInboxSVG from "../svg/illustrations/empty-inbox";
import { useMemo } from "react";

export interface IChatMessageFeedProps extends IChatMessageEventHandlers {
    chatMessages: IChatMessage[];
    chatId: string;
    loading: boolean;
    chatPictureUrl?: string;
    isTyping?: string[];
    editedMessageId?: string;
    editedMessageText?: string;
    errorMessage?: string;
    hasMore?: boolean;
}

const ChatMessageFeed: React.FC<IChatMessageFeedProps> = ({
    chatMessages,
    chatId,
    chatPictureUrl,
    isTyping,
    editedMessageId,
    editedMessageText,
    loading,
    errorMessage,
    hasMore,
    ...chatMessageHandlers
}) => {
    const chatMessageGroups = useMemo(
        () => getChatMessageGroups(chatMessages),
        [chatMessages]
    );

    return (
        <InvertScroll pageKey={chatId}>
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
            {!loading && !chatMessages?.length && (
                <PictureMessage
                    Svg={EmptyInboxSVG}
                    message="No messages exchanged"
                    subMessage="Say Hi, don't be shy!"
                    size="small"
                />
            )}
            {hasMore === false && (
                <PictureMessage
                    Svg={EmptyInboxSVG}
                    message="This is the start of your conversation"
                    size="small"
                />
            )}
        </InvertScroll>
    );
};

export default ChatMessageFeed;

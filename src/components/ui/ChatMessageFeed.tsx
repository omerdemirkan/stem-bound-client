import Typography from "@material-ui/core/Typography";
import { IChatMessage, IChatMessageEventHandlers } from "../../utils/types";
import { getChatMessageGroups } from "../../utils/helpers";
import ChatMessageGroup from "./ChatMessageGroup";
import InvertScroll from "../util/InvertScroll";
import PictureMessage from "./PictureMessage";
import EmptyInboxSVG from "../svg/illustrations/empty-inbox";
import { useMemo } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export interface IChatMessageFeedProps extends IChatMessageEventHandlers {
    chatMessages: IChatMessage[];
    chatId: string;
    loading: boolean;
    chatPictureUrl?: string;
    isTyping?: string[];
    errorMessage?: string;
    hasMore?: boolean;
    onLoadMore?(): any;
}

const ChatMessageFeed: React.FC<IChatMessageFeedProps> = ({
    chatMessages,
    chatId,
    chatPictureUrl,
    isTyping,
    loading,
    errorMessage,
    hasMore,
    onLoadMore,
    ...chatMessageHandlers
}) => {
    const chatMessageGroups = useMemo(
        () => getChatMessageGroups(chatMessages),
        [chatMessages]
    );

    return (
        <InvertScroll
            pageKey={chatId}
            onScrollToTop={hasMore ? onLoadMore : null}
        >
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
                    {...chatMessageHandlers}
                />
            ))}
            {!loading && !chatMessages?.length && (
                <PictureMessage
                    Svg={EmptyInboxSVG}
                    message="No messages exchanged"
                    subMessage="Say Hi, don't be shy!"
                    size="sm"
                />
            )}
            {hasMore === false && (
                <PictureMessage
                    Svg={EmptyInboxSVG}
                    subMessage="This is the start of your conversation"
                    size="xs"
                />
            )}
            {loading && <LinearProgress color="primary" />}
        </InvertScroll>
    );
};

export default ChatMessageFeed;

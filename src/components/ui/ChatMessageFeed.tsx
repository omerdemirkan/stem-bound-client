import Typography from "@material-ui/core/Typography";
import {
    IChatMessage,
    IChatMessageEventHandlers,
    IChatMessageGroup,
} from "../../utils/types";
import {
    getChatMessageGroups,
    getFormalDate,
    getFormalDateAndTime,
} from "../../utils/helpers";
import ChatMessageGroup from "./ChatMessageGroup";
import InvertScroll from "../util/InvertScroll";
import PictureMessage from "./PictureMessage";
import EmptyInboxSVG from "../svg/illustrations/empty-inbox";
import { useMemo } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { isSameDay } from "date-fns";
import { SectionHeader } from "./SectionHeader";

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
            {chatMessageGroups?.map((chatMessageGroup, index) => (
                <>
                    <ChatMessageGroup
                        chatMessageGroup={chatMessageGroup}
                        key={chatMessageGroup.messages[0]._id}
                        {...chatMessageHandlers}
                    />
                    {(index < chatMessageGroups.length - 1 &&
                        !isSameDay(
                            new Date(chatMessageGroup.messages[0].createdAt),
                            new Date(
                                chatMessageGroups[
                                    index + 1
                                ].messages[0].createdAt
                            )
                        )) ||
                    index === chatMessageGroups.length - 1 ? (
                        <div style={{ marginTop: "10px" }}>
                            <SectionHeader
                                title={getFormalDate(
                                    chatMessageGroup.messages[0].createdAt
                                )}
                            />
                        </div>
                    ) : null}
                </>
            ))}
            {!loading && !chatMessages?.length && (
                <PictureMessage
                    Svg={EmptyInboxSVG}
                    message="No messages exchanged"
                    subMessage="Say Hi, don't be shy!"
                    size="sm"
                />
            )}
            {hasMore === false &&
                typeof chatMessages?.length === "number" &&
                chatMessages.length > 0 && (
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

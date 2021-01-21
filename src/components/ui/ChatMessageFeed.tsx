import Typography from "@material-ui/core/Typography";
import { IChatMessage, IChatMessageEventHandlers } from "../../utils/types";
import { getChatMessageGroups } from "../../utils/helpers";
import ChatMessageGroup from "./ChatMessageGroup";
import InvertScroll from "../util/InvertScroll";
import useCompute from "../hooks/useCompute";
import PictureMessage from "./PictureMessage";
import EmptyInboxSVG from "../svg/illustrations/empty-inbox";

interface Props {
    chatMessages: IChatMessage[];
    chatId: string;
    loading: boolean;
    chatPictureUrl?: string;
    isTyping?: string[];
    editedMessageId?: string;
    editedMessageText?: string;
    errorMessage?: string;
}

const ChatMessageFeed: React.FC<Props & IChatMessageEventHandlers> = ({
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
            {!loading && !chatMessages?.length && (
                <PictureMessage
                    Svg={EmptyInboxSVG}
                    message="No messages exchanged"
                    subMessage="Say Hi, don't be shy!"
                    size="small"
                />
            )}
        </InvertScroll>
    );
};

export default ChatMessageFeed;

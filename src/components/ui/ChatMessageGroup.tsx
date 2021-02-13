import {
    IChatMessageEventHandlers,
    IChatMessageGroup,
} from "../../utils/types";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { userFetcher } from "../../utils/services";
import { reverseMap, getFormalDateAndTime } from "../../utils/helpers";
import ChatMessage from "./ChatMessage";
import { useFetchOnce } from "../../hooks/useFetchOnce";

export interface Props extends IChatMessageEventHandlers {
    chatMessageGroup: IChatMessageGroup;
    editedMessageId?: string;
    editedMessageText?: string;
}

const ChatMessageGroup: React.FC<Props> = ({
    chatMessageGroup,
    editedMessageId,
    editedMessageText,
    ...chatMessageHandlers
}) => {
    let { data: sender } = useFetchOnce(
        `/users/${chatMessageGroup?.senderId}`,
        userFetcher(chatMessageGroup?.senderId)
    );
    const senderFullName = `${sender?.firstName} ${sender?.lastName}`;

    return (
        <div className="chat-message-group-root">
            <span>
                <Avatar src={sender?.profilePictureUrl} alt={senderFullName} />
            </span>

            <div>
                <Typography
                    paragraph
                    color="textSecondary"
                    style={{ margin: "0" }}
                >
                    {senderFullName}
                    <Box
                        fontSize=".9rem"
                        display="inline"
                        marginLeft="20px"
                        component="span"
                    >
                        {getFormalDateAndTime(
                            chatMessageGroup.messages[0].createdAt
                        )}
                    </Box>
                </Typography>
                {reverseMap(chatMessageGroup.messages, (chatMessage) => (
                    <ChatMessage
                        chatMessage={chatMessage}
                        key={chatMessage._id}
                        {...chatMessageHandlers}
                    />
                ))}
            </div>

            <style jsx>{`
                .chat-message-group-root {
                    display: grid;
                    width: 100%;
                    grid-template-columns: 60px auto;
                    padding: 12px 10px 8px;
                }
                .avatar-box {
                    width: 60px;
                }
            `}</style>
        </div>
    );
};

export default ChatMessageGroup;

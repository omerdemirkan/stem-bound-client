import {
    IChatMessageEventHandlers,
    IChatMessageGroup,
} from "../../utils/types";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import format from "date-fns/format";
import useSWR from "swr";
import { userFetcher } from "../../utils/services";
import { reverseMap } from "../../utils/helpers";
import ChatMessage from "./ChatMessage";

interface Props {
    chatMessageGroup: IChatMessageGroup;
    editedMessageId?: string;
    editedMessageText?: string;
}

const ChatMessageGroup: React.FC<Props & IChatMessageEventHandlers> = ({
    chatMessageGroup,
    editedMessageId,
    editedMessageText,
    ...chatMessageHandlers
}) => {
    const { data: sender } = useSWR(
        `/users/${chatMessageGroup?.senderId}`,
        userFetcher(chatMessageGroup?.senderId),
        // Avoiding pointless refreshing
        {
            refreshInterval: 99999999,
            refreshWhenHidden: false,
            refreshWhenOffline: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
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
                        {format(
                            new Date(
                                chatMessageGroup?.messages[
                                    chatMessageGroup.messages.length - 1
                                ].createdAt
                            ),
                            "h:ss a, MM/dd/yyyy"
                        )}
                    </Box>
                </Typography>
                {reverseMap(chatMessageGroup.messages, (chatMessage) => (
                    <ChatMessage
                        chatMessage={chatMessage}
                        isBeingEdited={editedMessageId === chatMessage._id}
                        editValue={
                            editedMessageId === chatMessage._id &&
                            editedMessageText
                        }
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

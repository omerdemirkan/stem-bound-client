import { IChatMessageGroup } from "../../utils/types";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import format from "date-fns/format";
import useSWR from "swr";
import { userFetcher } from "../../utils/services";
import { reverseMap } from "../../utils/helpers";

interface Props {
    chatMessageGroup: IChatMessageGroup;
    onSetEdit?: (messageId: string) => any;
    onDelete?: (messageId: string) => any;
    onRestore?: (messageId: string) => any;
}

const ChatMessageGroup: React.FC<Props> = ({
    chatMessageGroup,
    onSetEdit,
    onDelete,
    onRestore,
}) => {
    const { data: sender } = useSWR(
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
                    <Box fontSize=".9rem" display="inline" marginLeft="20px">
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
                    <Typography
                        key={chatMessage._id}
                        paragraph
                        style={{ marginBottom: "3px" }}
                    >
                        {chatMessage.text}
                    </Typography>
                ))}
            </div>

            <style jsx>{`
                .chat-message-group-root {
                    display: grid;
                    grid-template-columns: 60px auto;
                    margin: 15px 0;
                }
                .avatar-box {
                    width: 60px;
                }
            `}</style>
        </div>
    );
};

export default ChatMessageGroup;

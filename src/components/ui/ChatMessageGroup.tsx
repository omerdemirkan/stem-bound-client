import { IChatMessage, IChatMessageGroup } from "../../utils/types";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import format from "date-fns/format";
import useSWR from "swr";
import { userFetcher } from "../../utils/services";

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
    const { user } = useContext(AuthContext);
    const { data: sender } = useSWR(
        `/users/${user._id}`,
        userFetcher(user._id)
    );

    return (
        <div className="chat-message-root">
            <span>
                <Avatar src={sender?.profilePictureUrl} />
            </span>

            <div>
                <Typography paragraph>
                    {`${sender?.firstName} ${sender?.lastName}`}
                    <Box fontSize=".8rem">{format(new Date(), "h:ss")}</Box>
                </Typography>
            </div>

            <style jsx>{`
                .chat-message-root {
                    display: grid;
                    grid-column-template: 60px auto;
                }
                .avatar-box {
                    width: 60px;
                }
            `}</style>
        </div>
    );
};

export default ChatMessageGroup;

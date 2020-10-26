import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useContext } from "react";
import { IChatMessage } from "../../utils/types";
import AuthContext from "../contexts/AuthContext";
import { reverseMap, getChatMessageGroups } from "../../utils/helpers";
import ChatMessageGroup from "./ChatMessageGroup";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    messageWrapper: {
        margin: "10px 0",
        display: "grid",
    },
    messageTextBox: {
        backgroundColor: "var(--accent-dark)",
        color: "white",
        padding: "12px 20px",
        borderRadius: "14px",
    },
    avatarBox: {
        display: "flex",
        justifyContent: "center",
        margin: "auto",
    },
    messageTextBoxCurrentUser: {
        flexDirection: "row-reverse",
        paddingLeft: "10%",
        paddingRight: "0",
        gridTemplateColumns: "auto 60px",
    },
    messageTextBoxOtherUser: {
        flexDirection: "row",
        paddingLeft: undefined,
        paddingRight: "10%",
        gridTemplateColumns: "60px auto",
    },
});

interface Props {
    chatMessages: IChatMessage[];
    chatPictureUrl?: string;
    isTyping?: string[];
}

const ChatFeed: React.FC<Props> = ({
    chatMessages,
    chatPictureUrl,
    isTyping,
}) => {
    const chatMessageGroups = getChatMessageGroups(chatMessages);
    return (
        <div>
            {reverseMap(chatMessageGroups, (chatMessageGroup) => (
                <ChatMessageGroup
                    chatMessageGroup={chatMessageGroup}
                    key={chatMessageGroup.messages[0]._id}
                />
            ))}
            {isTyping?.length ? (
                <Typography>
                    {isTyping.join(", ")} {isTyping.length > 1 ? "are" : "is"}{" "}
                    typing
                </Typography>
            ) : null}
        </div>
    );
};

export default ChatFeed;

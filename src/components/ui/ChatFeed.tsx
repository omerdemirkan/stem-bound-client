import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useContext, useEffect } from "react";
import { IChatMessage, IChatMessageEventHandlers } from "../../utils/types";
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
    editedMessageId?: string;
    editedMessageText?: string;
}

const ChatFeed: React.FC<Props & IChatMessageEventHandlers> = ({
    chatMessages,
    chatPictureUrl,
    isTyping,
    editedMessageId,
    editedMessageText,
    ...chatMessageHandlers
}) => {
    const chatMessageGroups = getChatMessageGroups(chatMessages);

    useEffect(function () {
        const element = document.getElementById("chat-feed");
        element.scrollTop = element.scrollHeight;
    }, []);

    return (
        <div id="chat-feed">
            {reverseMap(chatMessageGroups, (chatMessageGroup) => (
                <ChatMessageGroup
                    chatMessageGroup={chatMessageGroup}
                    key={chatMessageGroup.messages[0]._id}
                    editedMessageId={editedMessageId}
                    editedMessageText={editedMessageText}
                    {...chatMessageHandlers}
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

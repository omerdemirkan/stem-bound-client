import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useContext } from "react";
import { IMessage } from "../../utils/types";
import AuthContext from "../contexts/AuthContext";
import { reverseMap } from "../../utils/helpers";

const useStyles = makeStyles({
    messageWrapper: {
        margin: "10px 0",
        display: "grid",
    },
    messageTextBox: {
        backgroundColor: "var(--accent-dark)",
        color: "white",
        padding: "12px 20px",
        borderRadius: "14px"
    },
    avatarBox: {
        display: "flex",
        justifyContent: "center",
        margin: "auto"
    },
    messageTextBoxCurrentUser: { 
        flexDirection: "row-reverse", 
        paddingLeft: "10%", 
        paddingRight: "0",
        gridTemplateColumns: "auto 60px"
    },
    messageTextBoxOtherUser: { 
        flexDirection: "row", 
        paddingLeft: undefined, 
        paddingRight: "10%",
        gridTemplateColumns: "60px auto"
    }
});


interface Props {
    chatMessages: IMessage[];
    chatPictureUrl?: string;
    isTyping?: string[];
}

const ChatMessageList: React.FC<Props> = ({ chatMessages, chatPictureUrl, isTyping }) => {
    const classes = useStyles();
    const { user } = useContext(AuthContext);
    return <div>
        {chatMessages && reverseMap(chatMessages, function(message, index) {
            const sentByCurrentUser = user._id === message.meta.from;
            const renderAvatar = index === chatMessages.length - 1 ? true : chatMessages[index + 1]?.meta.from !== message.meta.from;
            return <>
                {renderAvatar && <br/>}
                <div 
                    className={`${classes.messageWrapper} ${sentByCurrentUser ? classes.messageTextBoxCurrentUser : classes.messageTextBoxOtherUser}`} 
                    key={message._id}
                >
                    
                    <div className={classes.avatarBox} style={{ gridColumn: sentByCurrentUser ? "2" : "1", gridRow: "1" }}>
                        {renderAvatar ? <Avatar src={sentByCurrentUser ? user.profilePictureUrl : chatPictureUrl}/> : null}
                    </div>
                    <div className={classes.messageTextBox} style={{ gridRow: "1" }}>
                        <Typography>{message.text}</Typography>
                    </div>
                </div>
            </>
        })}
        {isTyping?.length ? <Typography>{isTyping.join(", ")} {isTyping.length > 1 ? "are" : "is"} typing</Typography> : null}
    </div>
}

export default ChatMessageList;
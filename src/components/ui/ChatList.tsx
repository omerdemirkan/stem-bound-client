import { IChat } from "../../utils/types";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import format from "date-fns/format";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import formatDistance from "date-fns/formatDistance";
import CardActionArea from "@material-ui/core/CardActionArea";
import Section from "./Section";

const useStyles = makeStyles({
    listItem: {
        cursor: "pointer",
    },
});

interface Props {
    chats: IChat[];
    handleInspectChat: (chatId: string) => void;
    inspectedChatId?: string;
    loading?: boolean;
    errorMessage?: string;
}

const ChatList: React.FC<Props> = ({
    chats,
    handleInspectChat,
    inspectedChatId,
    loading,
    errorMessage,
}) => {
    const classes = useStyles();
    const now = new Date();
    return (
        <List>
            <Section
                title="My Inbox"
                loading={loading}
                errorMessage={errorMessage}
            >
                {chats?.map(function (chat, index) {
                    const lastUpdated = new Date(chat.lastMessageSentAt);
                    return (
                        <div key={chat._id}>
                            <CardActionArea>
                                <ListItem
                                    onClick={() => handleInspectChat(chat._id)}
                                    selected={inspectedChatId === chat._id}
                                    className={classes.listItem}
                                >
                                    <ListItemIcon>
                                        <Avatar
                                            src={chat.pictureUrl}
                                            alt="chat picture"
                                        />
                                    </ListItemIcon>
                                    <ListItemText>{chat.name}</ListItemText>
                                    <Typography
                                        color="textSecondary"
                                        align="right"
                                    >
                                        {formatDistance(lastUpdated, now, {
                                            addSuffix: true,
                                        })}
                                        <br />
                                        {format(lastUpdated, "H:mm a")}
                                    </Typography>
                                </ListItem>
                            </CardActionArea>
                            <Divider />
                        </div>
                    );
                })}
            </Section>
        </List>
    );
};

export default ChatList;

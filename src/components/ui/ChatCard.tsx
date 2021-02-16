import { EChatTypes, IChat } from "../../utils/types";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import formatDistance from "date-fns/formatDistance";
import format from "date-fns/format";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useFetchOnce } from "../../hooks/useFetchOnce";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { userFetcher } from "../../utils/services";

const useStyles = makeStyles({
    listItem: {
        cursor: "pointer",
    },
});

export interface IChatCardProps {
    chat: IChat;
    handleInspect: (chatId: string) => any;
    fullWidth?: boolean;
    isSelected?: boolean;
}

const ChatCard: React.FC<IChatCardProps> = ({
    chat,
    handleInspect,
    isSelected,
}) => {
    const classes = useStyles();
    const lastUpdated = new Date(chat.lastMessageSentAt);
    const { user } = useContext(AuthContext);

    const otherUserId =
        chat.type === EChatTypes.PRIVATE &&
        chat.meta.users[
            chat.meta.users.findIndex((userId) => userId !== user._id)
        ];

    const { data: contactedUser } = useFetchOnce(
        otherUserId && !chat.pictureUrl ? `/user/${otherUserId}` : null,
        userFetcher(otherUserId)
    );

    const chatPictureUrl = chat.pictureUrl || contactedUser?.profilePictureUrl,
        chatName = chat.name || contactedUser?.fullName;

    return (
        <CardActionArea>
            <ListItem
                onClick={() => handleInspect(chat._id)}
                selected={isSelected}
                className={classes.listItem}
            >
                <ListItemIcon>
                    <Avatar src={chatPictureUrl} alt="chat picture" />
                </ListItemIcon>
                <ListItemText>
                    {" "}
                    <Typography color="textPrimary">{chatName}</Typography>
                </ListItemText>
                {lastUpdated ? (
                    <Typography color="textSecondary" align="right">
                        {formatDistance(lastUpdated, new Date(), {
                            addSuffix: true,
                        })}
                        <br />
                        {format(lastUpdated, "H:mm a")}
                    </Typography>
                ) : null}
            </ListItem>
        </CardActionArea>
    );
};

export default ChatCard;

import { IChat } from "../../utils/types";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    card: {
        maxWidth: "300px",
        margin: "10px 0",
        cursor: "pointer",
    },
});

interface Props {
    chat: IChat;
    handleInspect: (chatId: string) => any;
    fullWidth?: boolean;
    noMargin?: boolean;
}

const ChatCard: React.FC<Props> = ({
    chat,
    handleInspect,
    fullWidth,
    noMargin,
}) => {
    const classes = useStyles();
    return (
        <Card
            onClick={() => handleInspect(chat._id)}
            className={classes.card}
            style={{
                width: fullWidth ? "100%" : undefined,
                margin: noMargin ? "0" : undefined,
            }}
        >
            <CardHeader
                title={chat.name}
                avatar={<Avatar src={chat.pictureUrl} />}
            />
        </Card>
    );
};

export default ChatCard;

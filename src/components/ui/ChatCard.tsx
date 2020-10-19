import { IChat } from "../../utils/types";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles({});

interface Props {
    chat: IChat;
    handleInspect: (chatId: string) => any;
    fullWidth?: boolean;
}

const ChatCard: React.FC<Props> = ({ chat, handleInspect }) => {
    const classes = useStyles();
    return (
        <ListItem onClick={() => handleInspect(chat._id)}>
            <CardHeader
                title={chat.name}
                avatar={<Avatar src={chat.pictureUrl} />}
            />
        </ListItem>
    );
};

export default ChatCard;

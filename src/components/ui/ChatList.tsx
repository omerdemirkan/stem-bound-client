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
import ChatCard from "./ChatCard";

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
                infoMessage={
                    !loading &&
                    !chats?.length &&
                    "You haven't started any conversations"
                }
            >
                {chats?.map((chat, index) => (
                    <div key={chat._id}>
                        <ChatCard
                            chat={chat}
                            handleInspect={handleInspectChat}
                            isSelected={inspectedChatId === chat._id}
                        />
                        {index !== chats.length - 1 && <Divider light />}
                    </div>
                ))}
            </Section>
        </List>
    );
};

export default ChatList;

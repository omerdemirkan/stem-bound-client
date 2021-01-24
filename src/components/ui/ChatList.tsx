import { IChat } from "../../utils/types";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Section from "./Section";
import ChatCard from "./ChatCard";

export interface IChatListProps {
    chats: IChat[];
    handleInspectChat: (chatId: string) => void;
    inspectedChatId?: string;
    loading?: boolean;
    errorMessage?: string;
}

const ChatList: React.FC<IChatListProps> = ({
    chats,
    handleInspectChat,
    inspectedChatId,
    loading,
    errorMessage,
}) => {
    return (
        <List>
            <Section
                title="My Inbox"
                noDivider
                spacing="sm"
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

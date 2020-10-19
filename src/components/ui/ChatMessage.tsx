import { IMessage } from "../../utils/types";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import Card from "@material-ui/core/Card";
import { Avatar } from "@material-ui/core";

interface Props {
    message: IMessage;
    avatarSrc?: string;
    onSetEdit?: (messageId: string) => any;
    onDelete?: (messageId: string) => any;
    onRestore?: (messageId: string) => any;
}

const ChatMessage: React.FC<Props> = ({
    message,
    onSetEdit,
    onDelete,
    onRestore,
    avatarSrc,
}) => {
    const { user } = useContext(AuthContext);
    const userIsMessageSender = user._id === message.meta.from;
    return (
        <Card style={{ width: "100%" }}>
            <Avatar src={avatarSrc} />
            {userIsMessageSender ? (
                <>
                    <button
                        onClick={() => onSetEdit(message._id)}
                        disabled={message.isDeleted}
                    >
                        EDIT
                    </button>

                    {message.isDeleted ? (
                        <button onClick={() => onRestore(message._id)}>
                            RESTORE
                        </button>
                    ) : (
                        <button onClick={() => onDelete(message._id)}>
                            DELETE
                        </button>
                    )}
                </>
            ) : null}
            {message.text}
        </Card>
    );
};

export default ChatMessage;

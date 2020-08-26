import { IMessage } from "../../utils/types";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

interface Props {
    message: IMessage;
    onSetEdit?: (messageId: string) => any;
    onDelete?: (messageId: string) => any;
    onRestore?: (messageId: string) => any;
}

const ChatMessage: React.FC<Props> = ({
    message,
    onSetEdit,
    onDelete,
    onRestore,
}) => {
    const { user } = useContext(AuthContext);
    const userIsMessageSender = user._id === message.meta.from;
    return (
        <div>
            {userIsMessageSender ? (
                <>
                    <button onClick={() => onSetEdit(message._id)}>EDIT</button>

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
            <pre>{JSON.stringify(message, null, 2)}</pre>
        </div>
    );
};

export default ChatMessage;

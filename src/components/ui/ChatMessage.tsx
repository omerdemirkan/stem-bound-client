import { IMessage } from "../../utils/types";

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
    return (
        <div>
            <button onClick={() => onSetEdit(message._id)}>EDIT</button>
            <button onClick={() => onDelete(message._id)}>DELETE</button>
            {message.isDeleted ? (
                <button onClick={() => onRestore(message._id)}>RESTORE</button>
            ) : null}
            <pre>{JSON.stringify(message, null, 2)}</pre>
        </div>
    );
};

export default ChatMessage;

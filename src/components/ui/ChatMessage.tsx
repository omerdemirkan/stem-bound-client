import { IMessage } from "../../utils/types";

interface Props {
    message: IMessage;
    onSetEdit?: (messageId: string) => any;
    onDelete?: (messageId: string) => any;
}

const ChatMessage: React.FC<Props> = ({ message, onSetEdit, onDelete }) => {
    return (
        <div>
            <button onClick={() => onSetEdit(message._id)}>EDIT</button>
            <button onClick={() => onDelete(message._id)}>DELETE</button>
            <pre>{JSON.stringify(message, null, 2)}</pre>
        </div>
    );
};

export default ChatMessage;

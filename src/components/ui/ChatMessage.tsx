import { IMessage } from "../../utils/types";

interface Props {
    message: IMessage;
    onSetEdit?: (messageId: string) => any;
}

const ChatMessage: React.FC<Props> = ({ message, onSetEdit }) => {
    return (
        <pre onClick={() => onSetEdit(message._id)}>
            {JSON.stringify(message, null, 2)}
        </pre>
    );
};

export default ChatMessage;

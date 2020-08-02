import { IUser } from "../../utils/types";

interface Props {
    user: IUser;
    handleSendMessage: (IUser) => any;
}

const UserCard: React.FC<Props> = ({ user, handleSendMessage }) => {
    return (
        <div>
            <button onClick={() => handleSendMessage(user)}>
                SEND MESSAGE
            </button>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
};

export default UserCard;

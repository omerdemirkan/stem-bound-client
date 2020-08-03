import { IUser } from "../../utils/types";

interface Props {
    user: IUser;
    onContactUser: (IUser) => any;
}

const UserCard: React.FC<Props> = ({ user, onContactUser }) => {
    return (
        <div>
            <button onClick={() => onContactUser(user)}>CONTACT</button>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
};

export default UserCard;

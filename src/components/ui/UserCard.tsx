import { IUser } from "../../utils/types";

interface Props {
    user: IUser;
}

const UserCard: React.FC<Props> = ({ user }) => {
    return (
        <div>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
};

export default UserCard;

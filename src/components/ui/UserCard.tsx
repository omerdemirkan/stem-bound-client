import { IUser } from "../../utils/types";

interface Props {
    user: IUser;
}

const UserCard: React.FC<Props> = ({ user }) => {
    return (
        <div>
            <p>
                {user.firstName} {user.lastName}
            </p>
            <p>{user.role}</p>
            <p>{user.shortDescription}</p>
        </div>
    );
};

export default UserCard;

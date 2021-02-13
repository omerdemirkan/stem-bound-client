import Avatar, { AvatarProps } from "@material-ui/core/Avatar";
import { userFetcher } from "../../utils/services";
import { useFetchOnce } from "../../hooks/useFetchOnce";

export interface IUserAvatarProps extends AvatarProps {
    userId: string;
}

const UserAvatar: React.FC<IUserAvatarProps> = ({ userId, ...avatarProps }) => {
    const { data: user } = useFetchOnce(
        userId ? `/users/${userId}` : null,
        userFetcher(userId)
    );
    return (
        <Avatar
            {...avatarProps}
            src={user.profilePictureUrl}
            alt={`${user.fullName}, ${user.displayRole}`}
        />
    );
};

export default UserAvatar;

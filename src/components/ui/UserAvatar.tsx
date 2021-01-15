import Avatar, { AvatarProps } from "@material-ui/core/Avatar";
import { userFetcher } from "../../utils/services";
import { useFetchOnce } from "../hooks/useFetchOnce";

interface Props extends AvatarProps {
    userId: string;
}

const UserAvatar: React.FC<Props> = ({ userId, ...avatarProps }) => {
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

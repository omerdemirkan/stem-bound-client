import Avatar from "@material-ui/core/Avatar";
import { getDisplayUserRole } from "../../utils/helpers";
import { IScreenProps, IUser } from "../../utils/types";
import ScreenLayout from "./ScreenLayout";
import Section from "./Section";
import Typography from "@material-ui/core/Typography";

export interface IUserScreenProps extends IScreenProps {
    user: IUser;
}

const UserScreen: React.FC<IUserScreenProps> = ({ user, onClose }) => {
    return (
        <ScreenLayout
            onClose={onClose}
            header={<Typography variant="h6">{user.fullName}</Typography>}
            subheader={getDisplayUserRole(user.role)}
            avatar={<Avatar src={user.profilePictureUrl} alt={user.fullName} />}
        >
            <Section title="About">
                <Typography variant="h6">{user.shortDescription}</Typography>
                {user.longDescription && (
                    <Typography paragraph>{user.longDescription}</Typography>
                )}
            </Section>
        </ScreenLayout>
    );
};

export default UserScreen;

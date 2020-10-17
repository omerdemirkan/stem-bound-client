import CardHeader from "@material-ui/core/CardHeader";
import Card, { CardProps } from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import InputButton from "./InputButton";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { EUserRoles, IInstructor, IStudent, IUser } from "../../utils/types";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";

export interface UserCardProps {
    user: IUser;
    onContactUser?: (user: IUser, message: string) => void;
    contactUserEnabled?: boolean;
    footerEl?: any;
    CardProps?: CardProps;
    noMargin?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
    user,
    onContactUser,
    contactUserEnabled,
    footerEl,
    CardProps,
    noMargin,
}) => {
    const fullName = `${user?.firstName} ${user?.lastName}`;
    return (
        <Card style={{ margin: noMargin ? "0" : "10px 0" }} {...CardProps}>
            <CardHeader
                title={fullName}
                subheader={user?.displayRole}
                avatar={<Avatar src={user?.profilePictureUrl} alt={fullName} />}
            />
            <Divider />
            <CardContent>
                <Typography paragraph>
                    <strong>{user?.shortDescription}</strong>
                    {user?.longDescription ? " - " + user.longDescription : ""}
                </Typography>
                {user?.role === EUserRoles.INSTRUCTOR ? (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Specialties
                        </Typography>
                        {(user as IInstructor)?.specialties.map((specialty) => (
                            <Chip
                                label={specialty}
                                key={`${user?._id}-specialties-${specialty}`}
                                color="primary"
                            />
                        ))}
                    </>
                ) : null}
                {user?.role === EUserRoles.STUDENT ? (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Interests
                        </Typography>
                        {(user as IStudent)?.interests.map((interest) => (
                            <Chip
                                label={interest}
                                key={`${user?._id}-interests-${interest}`}
                                color="primary"
                            />
                        ))}
                    </>
                ) : null}
            </CardContent>
            <CardActions>
                {footerEl}
                {contactUserEnabled ? (
                    <InputButton
                        onSubmit={(message) => onContactUser(user, message)}
                        renderInput={(value, setValue) => (
                            <TextField
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                fullWidth
                                autoFocus
                            />
                        )}
                    >
                        Contact
                    </InputButton>
                ) : null}
            </CardActions>
        </Card>
    );
};

export default UserCard;

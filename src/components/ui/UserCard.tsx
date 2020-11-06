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
import Section from "./Section";

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
            <CardContent style={{ paddingTop: "0", paddingBottom: "0" }}>
                <Section title="About Me" noDivider spacing={5}>
                    <Typography variant="h6" style={{ margin: "0 0 3px" }}>
                        {user?.shortDescription}
                    </Typography>
                    <Typography paragraph style={{ margin: "0 0 3px" }}>
                        {user?.longDescription}
                    </Typography>
                </Section>

                {user?.role === EUserRoles.INSTRUCTOR ? (
                    <Section title="My Specialties" spacing={5}>
                        {(user as IInstructor)?.specialties.map((specialty) => (
                            <Chip
                                label={specialty}
                                key={`${user?._id}-specialties-${specialty}`}
                                color="primary"
                            />
                        ))}
                    </Section>
                ) : null}

                {user?.role === EUserRoles.STUDENT ? (
                    <Section title="My Interests" spacing={5}>
                        {(user as IStudent)?.interests.map((interest) => (
                            <Chip
                                label={interest}
                                key={`${user?._id}-interests-${interest}`}
                                color="primary"
                            />
                        ))}
                    </Section>
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

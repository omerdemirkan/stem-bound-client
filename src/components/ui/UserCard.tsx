import CardHeader from "@material-ui/core/CardHeader";
import Card, { CardProps } from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { EUserRoles, IInstructor, IStudent, IUser } from "../../utils/types";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Section from "./Section";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    card: {
        margin: "10px 0",
        width: "100%",
        maxWidth: "500px",
        minWidth: "400px",
    },
});

export interface UserCardProps {
    user: IUser;
    contactUserEnabled?: boolean;
    footerEl?: any;
    renderFooter?(user: IUser): any;
    CardProps?: CardProps;
    noMargin?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
    user,
    contactUserEnabled,
    footerEl,
    renderFooter,
    CardProps,
    noMargin,
}) => {
    const classes = useStyles();
    return (
        <Card
            style={{ margin: noMargin ? "0" : "10px 0" }}
            {...CardProps}
            className={`${CardProps?.className ? CardProps.className : ""}${
                classes.card
            }`}
        >
            <CardHeader
                title={user?.fullName}
                subheader={user?.displayRole}
                avatar={
                    <Avatar
                        src={user?.profilePictureUrl}
                        alt={user?.fullName}
                    />
                }
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
                {renderFooter && renderFooter(user)}
            </CardActions>
        </Card>
    );
};

export default UserCard;

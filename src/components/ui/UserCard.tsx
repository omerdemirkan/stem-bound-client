import CardHeader, { CardHeaderProps } from "@material-ui/core/CardHeader";
import Card, { CardProps } from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardContent, { CardContentProps } from "@material-ui/core/CardContent";
import CardActions, { CardActionsProps } from "@material-ui/core/CardActions";
import { EUserRoles, IInstructor, IStudent, IUser } from "../../utils/types";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Section from "./Section";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        margin: "10px 5px",
        width: "100%",
        maxWidth: "450px",
    },
});

export interface IUserCardProps {
    user: IUser;
    footerEl?: any;
    renderFooter?(user: IUser): any;
    CardProps?: CardProps;
    CardHeaderProps?: CardHeaderProps;
    CardContentProps?: CardContentProps;
    CardActionsProps?: CardActionsProps;
    noMargin?: boolean;
    fullWidth?: boolean;
}

const UserCard: React.FC<IUserCardProps> = ({
    user,
    footerEl,
    renderFooter,
    noMargin,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    CardActionsProps,
    fullWidth,
}) => {
    const classes = useStyles();
    return (
        <Card
            style={{
                margin: noMargin ? "0" : undefined,
                maxWidth: !fullWidth ? "450px" : "none",
            }}
            {...CardProps}
            className={`${CardProps?.className ? CardProps.className : ""}${
                classes.card
            }`}
        >
            <CardHeader
                title={user?.fullName}
                subheader={
                    user?.displayRole +
                    (user.role === EUserRoles.STUDENT
                        ? ` - ${(user as IStudent).gradeLevel}th grade`
                        : "")
                }
                avatar={
                    <Avatar
                        src={user?.profilePictureUrl}
                        alt={user?.fullName}
                    />
                }
                {...CardHeaderProps}
            />
            <Divider />
            <CardContent
                style={{ paddingTop: "0", paddingBottom: "0" }}
                {...CardContentProps}
            >
                <Section title="About Me" noDivider spacing="xs">
                    <Typography variant="h6" style={{ margin: "0 0 3px" }}>
                        {user?.shortDescription}
                    </Typography>
                    <Typography paragraph style={{ margin: "0 0 3px" }}>
                        {user?.longDescription}
                    </Typography>
                </Section>

                {user?.role === EUserRoles.INSTRUCTOR ? (
                    <Section title="My Specialties" spacing="xs">
                        {(user as IInstructor).specialties
                            .slice(0, 3)
                            .map((specialty) => (
                                <Chip
                                    label={specialty}
                                    key={`${user?._id}-specialties-${specialty}`}
                                    color="primary"
                                />
                            ))}
                        {(user as IInstructor).specialties.length > 3 ? (
                            <Chip
                                label={`${
                                    (user as IInstructor).specialties.length - 3
                                } More`}
                                color="primary"
                                variant="outlined"
                            />
                        ) : null}
                    </Section>
                ) : null}

                {user?.role === EUserRoles.STUDENT ? (
                    <Section title="My Interests" spacing="xs">
                        {(user as IStudent).interests
                            .slice(0, 3)
                            .map((interest) => (
                                <Chip
                                    label={interest}
                                    key={`${user?._id}-interests-${interest}`}
                                    color="primary"
                                />
                            ))}
                        {(user as IStudent).interests.length > 3 ? (
                            <Chip
                                label={`${
                                    (user as IStudent).interests.length - 3
                                } More`}
                                color="primary"
                                variant="outlined"
                            />
                        ) : null}
                    </Section>
                ) : null}
            </CardContent>
            <CardActions {...CardActionsProps}>
                {footerEl}
                {renderFooter && renderFooter(user)}
            </CardActions>
        </Card>
    );
};

export default UserCard;

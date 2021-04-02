import CardHeader, { CardHeaderProps } from "@material-ui/core/CardHeader";
import Card, { CardProps } from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardContent, { CardContentProps } from "@material-ui/core/CardContent";
import CardActions, { CardActionsProps } from "@material-ui/core/CardActions";
import {
    EUserRoles,
    IInstructor,
    ISchoolOfficial,
    IStudent,
    IUser,
} from "../../utils/types";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Section from "./Section";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";
import UserScreen from "./UserScreen";
import ChipList from "./ChipList";
import { useSchool } from "../../hooks/useSchool";

const useStyles = makeStyles({
    card: {
        margin: "10px 0",
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
    noMargin,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    CardActionsProps,
    fullWidth,
    renderFooter,
}) => {
    const classes = useStyles();
    const { createScreen } = useContext(NotificationContext);
    const { school } = useSchool((user as IStudent).meta.school);

    function handleInspectUser() {
        createScreen({
            renderContent: (props) => <UserScreen {...props} user={user} />,
        });
    }

    let subheader = user?.displayRole as string;
    if (user.role === EUserRoles.STUDENT)
        subheader += ` - ${(user as IStudent).gradeLevel}th grade`;
    if (school) subheader += ` - ${school.name}`;
    if (subheader === (user?.displayRole as string))
        subheader += ` - ${user.location.city}, ${user.location.state}`;

    return (
        <Card
            {...CardProps}
            style={{
                margin: noMargin ? "0" : fullWidth ? "10px 0" : "10px 5px",
                maxWidth: fullWidth ? "none" : undefined,
                ...CardProps?.style,
            }}
            className={classes.card}
        >
            <CardHeader
                title={user?.fullName}
                subheader={subheader}
                avatar={
                    <Avatar
                        src={user?.profilePictureUrl}
                        alt={user?.fullName}
                    />
                }
                style={{ cursor: "pointer" }}
                onClick={handleInspectUser}
                {...CardHeaderProps}
            />

            <Divider />

            <CardContent
                style={{ paddingTop: "0", paddingBottom: "0" }}
                {...CardContentProps}
            >
                <Section title="About" noDivider spacing="xs">
                    <Typography component="span" paragraph>
                        <Box component="span" fontWeight="500">
                            {user?.shortDescription}
                        </Box>
                    </Typography>
                    {user?.longDescription && (
                        <Typography paragraph noWrap>
                            {user?.longDescription}
                        </Typography>
                    )}
                </Section>

                {user?.role === EUserRoles.SCHOOL_OFFICIAL ? (
                    <Section title="Position">
                        <Typography paragraph component="span">
                            {(user as ISchoolOfficial).position}
                        </Typography>
                    </Section>
                ) : null}

                {user?.role === EUserRoles.INSTRUCTOR ? (
                    <Section title="Specialties" spacing="xs">
                        <ChipList
                            data={(user as IInstructor).specialties}
                            max={3}
                        />
                    </Section>
                ) : null}

                {user?.role === EUserRoles.STUDENT ? (
                    <Section title="Interests" spacing="xs">
                        <ChipList data={(user as IStudent).interests} max={3} />
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

import Avatar from "@material-ui/core/Avatar";
import {
    EUserRoles,
    IInstructor,
    ISchoolOfficial,
    IScreenProps,
    IStudent,
    IUser,
} from "../../utils/types";
import ScreenLayout from "../layouts/ScreenLayout";
import Section from "./Section";
import Typography from "@material-ui/core/Typography";
import ChipList from "./ChipList";
import ContactUserButton from "../util/ContactUserButton";
import { getCurrentSchoolYear } from "../../utils/helpers";
import CopyToClipboard from "../util/CopyToClipboard";
import useSchool from "../../hooks/useSchool";

export interface IUserScreenProps extends IScreenProps {
    user: IUser;
}

const UserScreen: React.FC<IUserScreenProps> = ({ user, onClose }) => {
    const { school } = useSchool((user as IStudent).meta.school);

    return (
        <ScreenLayout
            onClose={onClose}
            header={<Typography variant="h6">{user.fullName}</Typography>}
            subheader={`${user.displayRole} - ${user.location.city}, ${user.location.state}`}
            avatar={<Avatar src={user.profilePictureUrl} alt={user.fullName} />}
            actionEl={
                <>
                    <ContactUserButton
                        userId={user._id}
                        color="primary"
                        onClick={onClose}
                    >
                        CONTACT
                    </ContactUserButton>
                </>
            }
        >
            <Section title="About" spacing="xs">
                <Typography variant="h6" gutterBottom>
                    {user.shortDescription}
                </Typography>
                {user.longDescription && (
                    <Typography paragraph>{user.longDescription}</Typography>
                )}
            </Section>
            {school?.name && (
                <Section title="School" spacing="xs">
                    <Typography paragraph>{school.name}</Typography>
                </Section>
            )}
            {(user as IStudent).gradeLevel && (
                <Section
                    title={`Grade Level (${getCurrentSchoolYear()})`}
                    spacing="xs"
                >
                    <Typography paragraph>
                        {(user as IStudent).gradeLevel}
                    </Typography>
                </Section>
            )}
            {(user as ISchoolOfficial).position && (
                <Section title="Position" spacing="xs">
                    <Typography paragraph>
                        {(user as ISchoolOfficial).position}
                    </Typography>
                </Section>
            )}

            {user.role === EUserRoles.INSTRUCTOR ? (
                <Section title="Specialties" spacing="xs">
                    <ChipList data={(user as IInstructor).specialties} />
                </Section>
            ) : null}
            {(user as IInstructor).remoteResumeUrl && (
                <Section title="Resume" spacing="xs">
                    <CopyToClipboard
                        text={(user as IInstructor).remoteResumeUrl}
                        description="Resume URL"
                    />
                </Section>
            )}

            {user.role === EUserRoles.STUDENT &&
            (user as IStudent).interests.length ? (
                <Section title="Interests" spacing="xs">
                    <ChipList data={(user as IStudent).interests} />
                </Section>
            ) : null}
            <Section title="Email" spacing="xs">
                <Typography paragraph>{user.email}</Typography>
            </Section>
        </ScreenLayout>
    );
};

export default UserScreen;

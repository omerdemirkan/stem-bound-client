import AuthContext from "../../../components/contexts/AuthContext";
import useSWR from "swr";
import Head from "next/head";
import PictureInput from "../../../components/ui/PictureInput";
import withAuth from "../../../components/hoc/withAuth";
import { capitalizeWords, getCurrentSchoolYear } from "../../../utils/helpers";
import {
    userFetcher,
    updateUserProfilePicture,
    updateUserById,
    updateUserLocation,
} from "../../../utils/services";
import { useContext, useEffect } from "react";
import InputButton from "../../../components/util/InputButton";
import {
    IUserOriginal,
    IStudent,
    EUserRoles,
    IInstructor,
    IInstructorOriginal,
} from "../../../utils/types";
import ChipInput from "../../../components/util/ChipInput";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ActionBar from "../../../components/ui/ActionBar";
import EditableSection from "../../../components/ui/EditableSection";
import GradeLevelInput from "../../../components/util/GradeLevelInput";
import LocationAsyncSelect from "../../../components/util/LocationAsyncSelect";
import ChipList from "../../../components/ui/ChipList";
import CopyToClipboard from "../../../components/util/CopyToClipboard";
import { makeStyles } from "@material-ui/core";
import AppSettingsLayout from "../../../components/layouts/AppSettingsLayout";
import NavigationButton from "../../../components/ui/NavigationButton";
import List from "@material-ui/core/List";
import Link from "next/link";

const useStyles = makeStyles({
    avatar: {
        width: "100px",
        height: "100px",
    },
    editButton: {
        float: "right",
        margin: "0 10px",
    },
});

const MyAccountAppPage: React.FC = () => {
    const { user: storedUser, mutateUser: mutateAuthContextUser } =
        useContext(AuthContext);
    const { data: fetchedUser, mutate: mutateFetchedUser } = useSWR(
        storedUser?._id ? `/user/${storedUser?._id}` : null,
        userFetcher(storedUser?._id)
    );
    const user = fetchedUser || storedUser;

    const classes = useStyles();

    // Because this route has update user functionality,
    // this is to mutate the auth context user
    useEffect(
        function () {
            if (fetchedUser) {
                mutateAuthContextUser(fetchedUser);
            }
        },
        [fetchedUser]
    );

    async function handleProfilePictureCreated(file: File) {
        const { data: updatedUser } = await updateUserProfilePicture(
            user._id,
            file
        );
        mutateFetchedUser(updatedUser, false);
    }

    async function handleUpdateUser(update: Partial<IUserOriginal>) {
        const { data: updatedUser } = await updateUserById(user._id, update);
        mutateFetchedUser(updatedUser, false);
    }

    const handleUpdateUserField = (key: keyof IUserOriginal) => (value) =>
        handleUpdateUser({ [key]: value });

    async function handleUpdateUserLocationByZip(zip: string) {
        const { data: updatedUser } = await updateUserLocation(user._id, {
            zip,
        });
        mutateFetchedUser(updatedUser, false);
        mutateAuthContextUser(fetchedUser);
    }

    const currentSchoolYear =
        user.role === EUserRoles.STUDENT ? getCurrentSchoolYear() : null;

    return (
        <AppSettingsLayout
            header="My Account"
            navigationEl={<SettingsNavigation activeLabel="My Account" />}
        >
            <Head>
                <title>My Account - STEM-bound</title>
            </Head>

            <ActionBar
                startEl={
                    <div className="my-accounts-header">
                        <Avatar
                            src={user.profilePictureUrl}
                            alt="Your Profile Picture"
                            className={classes.avatar}
                        />
                        <div>
                            <Typography
                                variant="h5"
                                color="textPrimary"
                            >{`${user.firstName} ${user.lastName}`}</Typography>
                            <Typography paragraph color="textPrimary">{`${
                                user.displayRole
                            } - ${capitalizeWords(user.location.city)}, ${
                                user.location.state
                            }`}</Typography>
                        </div>
                    </div>
                }
            >
                {user.role === EUserRoles.INSTRUCTOR && (
                    <InputButton
                        initialValue={user.location.zip}
                        onSubmit={handleUpdateUserLocationByZip}
                        renderInput={(value, setValue) => (
                            <LocationAsyncSelect
                                onChange={(location) => setValue(location?.zip)}
                            />
                        )}
                        ButtonProps={{
                            color: "primary",
                            className: classes.editButton,
                            size: "small",
                        }}
                    >
                        UPDATE LOCATION
                    </InputButton>
                )}
                <PictureInput
                    onFileCreated={handleProfilePictureCreated}
                    baseFileName={`${user._id}-profile-picture`}
                    buttonText={`${
                        user.profilePictureUrl ? "UPDATE" : "ADD"
                    } PROFILE PICTURE`}
                    ButtonProps={{
                        color: "primary",
                        className: classes.editButton,
                        size: "small",
                    }}
                />
            </ActionBar>

            <EditableSection
                title="Short Description"
                onEdit={handleUpdateUserField("shortDescription")}
                value={user.shortDescription}
                TypographyProps={{ variant: "h5" }}
            />

            <EditableSection
                title="Long Description"
                value={user.longDescription || ""}
                onEdit={handleUpdateUserField("longDescription")}
                buttonText={`${
                    user.longDescription ? "UPDATE" : "ADD"
                } LONG DESCRIPTION`}
                TextFieldProps={{
                    multiline: true,
                    variant: "outlined",
                    margin: "none",
                }}
            />

            {user.role === EUserRoles.STUDENT ? (
                <>
                    <EditableSection
                        title="Interests"
                        value={(user as IStudent).interests}
                        onEdit={handleUpdateUserField(
                            "interests" as keyof IStudent as any
                        )}
                        InputButtonProps={{
                            renderInput: (value, setValue) => (
                                <ChipInput
                                    onChange={setValue}
                                    value={value}
                                    TextFieldProps={{
                                        fullWidth: true,
                                        id: "interests",
                                    }}
                                />
                            ),
                        }}
                    >
                        <ChipList data={(user as IStudent).interests} />
                    </EditableSection>
                    <EditableSection
                        title="Grade Level"
                        value={(user as IStudent).gradeLevel}
                        onEdit={(gradeLevel) =>
                            handleUpdateUser({
                                initialGradeLevel: gradeLevel,
                                initialSchoolYear: currentSchoolYear,
                            })
                        }
                        InputButtonProps={{
                            renderInput: (value, setValue) => (
                                <GradeLevelInput
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            ),
                        }}
                    ></EditableSection>
                </>
            ) : null}

            {user.role === EUserRoles.INSTRUCTOR ? (
                <>
                    <EditableSection
                        title="Specialties"
                        value={(user as IInstructor).specialties}
                        onEdit={handleUpdateUserField(
                            "specialties" as keyof IInstructorOriginal as any
                        )}
                        InputButtonProps={{
                            renderInput: (value, setValue) => (
                                <ChipInput
                                    onChange={setValue}
                                    value={value}
                                    TextFieldProps={{
                                        fullWidth: true,
                                        id: "specialties",
                                    }}
                                />
                            ),
                        }}
                    >
                        <ChipList data={(user as IInstructor).specialties} />
                    </EditableSection>
                    <EditableSection
                        title="Resume Url"
                        value={(user as IInstructor).remoteResumeUrl || ""}
                        onEdit={handleUpdateUserField(
                            "remoteResumeUrl" as keyof IInstructorOriginal as any
                        )}
                        buttonText={`${
                            (user as IInstructor).remoteResumeUrl
                                ? "UPDATE"
                                : "ADD"
                        } RESUME URL`}
                        TextFieldProps={{
                            placeholder:
                                "A link to where your resume can be accessed",
                        }}
                    >
                        <CopyToClipboard
                            text={(user as IInstructor).remoteResumeUrl}
                            description="Resume URL"
                        />
                    </EditableSection>
                </>
            ) : null}

            <style jsx>{`
                .my-accounts-header {
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    grid-gap: 40px;
                    flex-wrap: wrap;
                }
            `}</style>
        </AppSettingsLayout>
    );
};

export default withAuth(MyAccountAppPage);

const settingsNavigationData = [
    {
        label: "My Account",
        href: "/app/settings",
    },
    {
        label: "Preferences",
        href: "/app/settings/preferences",
    },
];

export interface ISettingsNavigationProps {
    activeLabel: string;
}

export const SettingsNavigation: React.FC<ISettingsNavigationProps> = ({
    activeLabel,
}) => {
    return (
        <List>
            {settingsNavigationData.map(({ label, href }) => (
                <Link href={href}>
                    <a>
                        <NavigationButton
                            active={
                                label.toLocaleLowerCase() ===
                                activeLabel.toLocaleLowerCase()
                            }
                        >
                            {label}
                        </NavigationButton>
                    </a>
                </Link>
            ))}
        </List>
    );
};

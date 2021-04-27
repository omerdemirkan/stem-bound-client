import useSWR from "swr";
import AppLayout from "../../../../components/layouts/AppLayout";
import withAuth from "../../../../components/hoc/withAuth";
import {
    courseFetcher,
    createCourseInstructorInvitation,
    updateCourseById,
    updateCourseVerification,
    usersFetcher,
} from "../../../../utils/services";
import {
    ECourseVerificationStatus,
    ENotificationTypes,
    EUserRoles,
    ICourseOriginal,
    IUser,
} from "../../../../utils/types";
import { useRouter } from "next/router";
import SplitScreen from "../../../../components/ui/SplitScreen";
import EditableSection from "../../../../components/ui/EditableSection";
import Section from "../../../../components/ui/Section";
import UserCard from "../../../../components/ui/UserCard";
import Button from "@material-ui/core/Button";
import {
    configureCourseVerificationUpdateAlertDTO,
    getDisplayCourseVerificationStatus,
    getLongDate,
    getShortDate,
} from "../../../../utils/helpers";
import Chip from "@material-ui/core/Chip";
import { useContext } from "react";
import AuthContext from "../../../../components/contexts/AuthContext";
import NotificationContext from "../../../../components/contexts/NotificationContext";
import RelativeGrid from "../../../../components/ui/RelativeGrid";
import InputButton from "../../../../components/util/InputButton";
import UserAsyncSelect from "../../../../components/util/UserAsyncSelect";
import ContactUserButton from "../../../../components/util/ContactUserButton";
import Head from "next/head";
import useSchool from "../../../../hooks/useSchool";
import Typography from "@material-ui/core/Typography";

const CourseSettingsAppPage: React.FC = () => {
    const router = useRouter();
    const courseId = router.query.id as string;
    const { user } = useContext(AuthContext);
    const { createAlert, createSnackbar } = useContext(NotificationContext);
    const { data: course, revalidate: refetchCourse } = useSWR(
        courseId ? `/courses/${courseId}` : null,
        courseFetcher(courseId)
    );
    const {
        data: instructors,
        error: instructorsError,
        isValidating: instructorsLoading,
    } = useSWR(
        courseId ? `/courses/${courseId}/instructors` : null,
        usersFetcher(EUserRoles.INSTRUCTOR, { courseId })
    );
    const {
        data: students,
        error: studentsError,
        isValidating: studentsLoading,
    } = useSWR(
        courseId ? `/courses/${courseId}/students` : null,
        usersFetcher(EUserRoles.STUDENT, { courseId })
    );
    const { school } = useSchool(course?.meta.school);

    async function handleCourseUpdate(courseUpdates: Partial<ICourseOriginal>) {
        await updateCourseById(courseId, courseUpdates);
        refetchCourse();
        createSnackbar({ text: "Account updated", type: "success" });
    }

    const handleUpdateCourseField = (key: keyof ICourseOriginal) => (value) =>
        handleCourseUpdate({ [key]: value });

    async function handleUpdateCourseVerification(
        verificationStatus: ECourseVerificationStatus
    ) {
        await updateCourseVerification(courseId, verificationStatus);
        refetchCourse();
    }

    async function handleUpdateCourseVerificationClicked(
        verificationStatus: ECourseVerificationStatus
    ) {
        createAlert({
            ...configureCourseVerificationUpdateAlertDTO(verificationStatus, {
                course,
                schoolName: school.name,
            }),
            type: ENotificationTypes.INFO,
            onOk: () => handleUpdateCourseVerification(verificationStatus),
            onCancel: () => {},
        });
    }

    async function handleInviteInstructor(user: IUser) {
        createAlert({
            headerText: `Are you sure you want to invite ${user.fullName} as an instructor?`,
            bodyText: `Remember, this will give complete instructor privileges and cannot be undone.`,
            type: ENotificationTypes.INFO,
            async onOk() {
                try {
                    await createCourseInstructorInvitation({
                        courseId: course._id,
                        invitedUserId: user._id,
                    });
                    createSnackbar({
                        text: `${user.firstName} successfully invited!`,
                        type: "success",
                    });
                } catch (e) {
                    createSnackbar({
                        text: "An error occured",
                        type: "error",
                    });
                }
            },
            onCancel() {},
            renderFooter: () => (
                <ContactUserButton userId={user._id} color="primary" newTab>
                    Contact {user.firstName}
                </ContactUserButton>
            ),
        });
    }

    return (
        <AppLayout
            breadCrumbs={[
                { label: "Courses", href: "/app/courses" },
                {
                    label: course?.title,
                    href: "/app/courses/[id]",
                    as: `/app/courses/${course?._id}`,
                },
                { label: "Settings" },
            ]}
        >
            <Head>
                <title>STEM-bound - Home</title>
            </Head>
            <SplitScreen
                mainEl={
                    <>
                        <EditableSection
                            title="Title"
                            noDivider
                            spacing="sm"
                            paddingTop="0"
                            onEdit={handleUpdateCourseField("title")}
                            value={course?.title}
                            TypographyProps={{ variant: "h5" }}
                            InputButtonProps={{
                                minLength: [4, "Too short!"],
                            }}
                            TextFieldProps={{
                                inputProps: { maxLength: 50 },
                            }}
                        />

                        {school && (
                            <Section title="School" spacing="sm">
                                <Typography paragraph color="textPrimary">
                                    {school.name}
                                </Typography>
                            </Section>
                        )}

                        <Section title="Duration" spacing="sm">
                            {course && (
                                <Typography paragraph color="textPrimary">
                                    From {getLongDate(course?.start)} to{" "}
                                    {getLongDate(course?.end)}
                                </Typography>
                            )}
                        </Section>

                        <EditableSection
                            title="Short Description"
                            spacing="sm"
                            onEdit={handleUpdateCourseField("shortDescription")}
                            value={course?.shortDescription}
                            InputButtonProps={{
                                minLength: [4, "Too short!"],
                            }}
                            TextFieldProps={{
                                multiline: true,
                                variant: "outlined",
                                margin: "none",
                                inputProps: { maxLength: 100 },
                            }}
                        />
                        <EditableSection
                            title="Long Description"
                            spacing="sm"
                            onEdit={handleUpdateCourseField("longDescription")}
                            value={course?.longDescription}
                            InputButtonProps={{
                                minLength: [4, "Too short!"],
                            }}
                            TextFieldProps={{
                                multiline: true,
                                variant: "outlined",
                                margin: "none",
                                inputProps: { maxLength: 2000 },
                            }}
                        />
                        <Section
                            title="Verification Status"
                            spacing="sm"
                            actionEl={
                                <>
                                    {user.role === EUserRoles.INSTRUCTOR &&
                                        course?.verificationStatus ===
                                            ECourseVerificationStatus.UNPUBLISHED && (
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="contained"
                                                onClick={() =>
                                                    handleUpdateCourseVerificationClicked(
                                                        ECourseVerificationStatus.PENDING_VERIFICATION
                                                    )
                                                }
                                            >
                                                Publish Course
                                            </Button>
                                        )}
                                </>
                            }
                        >
                            <Chip
                                label={getDisplayCourseVerificationStatus(
                                    course?.verificationStatus
                                )}
                                color={
                                    course?.verificationStatus ===
                                    ECourseVerificationStatus.DISMISSED
                                        ? "secondary"
                                        : "primary"
                                }
                            />
                        </Section>
                    </>
                }
                secondaryEl={
                    <>
                        <Section
                            title="Instructors"
                            spacing="sm"
                            noDivider
                            actionEl={
                                <InputButton
                                    onSubmit={handleInviteInstructor}
                                    validate={(user) =>
                                        user
                                            ? true
                                            : "You haven't selected an instructor"
                                    }
                                    renderInput={(
                                        value,
                                        setValue,
                                        { errorMessage }
                                    ) => (
                                        <UserAsyncSelect
                                            onChange={setValue}
                                            userRole={EUserRoles.INSTRUCTOR}
                                            TextFieldProps={{
                                                error: !!errorMessage,
                                                helperText: errorMessage,
                                            }}
                                            options={{
                                                exclude: course?.meta
                                                    .instructors || [user._id],
                                            }}
                                        />
                                    )}
                                    ButtonProps={{
                                        size: "small",
                                        color: "primary",
                                    }}
                                >
                                    Invite Instructor
                                </InputButton>
                            }
                            errorMessage={
                                instructorsError &&
                                "Couldn't load instructors, an error occured"
                            }
                            loading={instructorsLoading}
                        >
                            <RelativeGrid minWidth="400px">
                                {instructors?.map((instructor) => (
                                    <UserCard
                                        user={instructor}
                                        noMargin
                                        fullWidth
                                    />
                                ))}
                            </RelativeGrid>
                        </Section>
                        <Section
                            title="Students"
                            errorMessage={
                                studentsError &&
                                "Couldn't load students, an error occured"
                            }
                            infoMessage={
                                !studentsError &&
                                students?.length === 0 &&
                                "No students enrolled"
                            }
                            loading={studentsLoading}
                        >
                            <RelativeGrid minWidth="400px">
                                {students?.map((student) => (
                                    <UserCard
                                        user={student}
                                        fullWidth
                                        noMargin
                                    />
                                ))}
                            </RelativeGrid>
                        </Section>
                    </>
                }
            />
        </AppLayout>
    );
};

export default withAuth(CourseSettingsAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

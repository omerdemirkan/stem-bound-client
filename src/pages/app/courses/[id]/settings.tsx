import useSWR from "swr";
import AppLayout from "../../../../components/containers/AppLayout";
import withAuth from "../../../../components/hoc/withAuth";
import {
    courseFetcher,
    schoolFetcher,
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
    getCourseVerificationStatusDisplay,
} from "../../../../utils/helpers";
import { Chip } from "@material-ui/core";
import { useContext } from "react";
import AuthContext from "../../../../components/contexts/AuthContext";
import NotificationContext from "../../../../components/contexts/NotificationContext";
import RelativeGrid from "../../../../components/ui/RelativeGrid";
import InputButton from "../../../../components/util/InputButton";
import UserAsyncSelect from "../../../../components/util/UserAsyncSelect";
import ContactUserButton from "../../../../components/util/ContactUserButton";

const CourseSettingsAppPage: React.FC = () => {
    const router = useRouter();
    const courseId = router.query.id as string;
    const { user } = useContext(AuthContext);
    const { createAlert } = useContext(NotificationContext);
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
    const {
        data: school,
        isValidating: schoolLoading,
        error: schoolError,
    } = useSWR(
        course?.meta.school ? `/schools/${course?.meta.school}` : null,
        schoolFetcher(course?.meta.school)
    );

    async function handleCourseUpdate(courseUpdates: Partial<ICourseOriginal>) {
        await updateCourseById(courseId, courseUpdates);
        refetchCourse();
    }

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
            onOk() {},
            onCancel() {},
            renderFooter: ({ closeAlert }) => (
                <ContactUserButton
                    userId={user._id}
                    onClick={closeAlert}
                    color="primary"
                >
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
            <SplitScreen
                mainEl={
                    <>
                        <EditableSection
                            title="Title"
                            noDivider
                            spacing="sm"
                            paddingTop="0"
                            onEdit={(title) => handleCourseUpdate({ title })}
                            value={course?.title}
                            TypographyProps={{ variant: "h5" }}
                            InputButtonProps={{
                                minLength: [4, "Too short!"],
                            }}
                            TextFieldProps={{
                                inputProps: { maxLength: 50 },
                            }}
                        />
                        <EditableSection
                            title="Short Description"
                            spacing="sm"
                            onEdit={(shortDescription) =>
                                handleCourseUpdate({ shortDescription })
                            }
                            value={course?.shortDescription}
                            InputButtonProps={{
                                minLength: [4, "Too short!"],
                            }}
                            TextFieldProps={{
                                multiline: true,
                                inputProps: { maxLength: 100 },
                            }}
                        />
                        <EditableSection
                            title="Long Description"
                            spacing="sm"
                            onEdit={(longDescription) =>
                                handleCourseUpdate({ longDescription })
                            }
                            value={course?.longDescription}
                            InputButtonProps={{
                                minLength: [4, "Too short!"],
                            }}
                            TextFieldProps={{
                                multiline: true,
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
                                label={getCourseVerificationStatusDisplay(
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
                                                exclude:
                                                    course.meta.instructors,
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
                            <RelativeGrid minWidthInPixels={400}>
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
                            <RelativeGrid minWidthInPixels={400}>
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

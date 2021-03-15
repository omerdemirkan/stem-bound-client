import AppLayout from "../../../../components/containers/AppLayout";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import withAuth from "../../../../components/hoc/withAuth";
import Button from "@material-ui/core/Button";
import UserCard from "../../../../components/ui/UserCard";
import CourseAnnouncement from "../../../../components/ui/CourseAnnouncement";
import MeetingCard from "../../../../components/ui/MeetingCard";
import { useRouter } from "next/router";
import {
    announcementsFetcher,
    courseFetcher,
    courseInstructorsFetcher,
    courseMeetingsFetcher,
    courseStudentsFetcher,
    schoolFetcher,
    updateCourseVerification,
} from "../../../../utils/services";
import Section from "../../../../components/ui/Section";
import SplitScreen from "../../../../components/ui/SplitScreen";
import {
    ECourseVerificationStatus,
    ENotificationTypes,
    EUserRoles,
} from "../../../../utils/types";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import {
    configureCourseVerificationUpdateAlertDTO,
    getFormalDateAndTime,
} from "../../../../utils/helpers";
import { useContext } from "react";
import AuthContext from "../../../../components/contexts/AuthContext";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import NotificationContext from "../../../../components/contexts/NotificationContext";
import ContactUserButton from "../../../../components/util/ContactUserButton";

const CourseAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id as string;
    const { createAlert } = useContext(NotificationContext);
    const { user } = useContext(AuthContext);
    const { data: course, revalidate: refetchCourse } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );
    const {
        data: instructors,
        isValidating: instructorsLoading,
        error: instructorsError,
    } = useSWR(
        course?._id ? `/courses/${course?._id}/instructors` : null,
        courseInstructorsFetcher(course?._id)
    );
    const {
        data: students,
        isValidating: studentsLoading,
        error: studentsError,
    } = useSWR(
        course?._id ? `/courses/${course?._id}/students` : null,
        courseStudentsFetcher(course?._id)
    );
    const { data: school } = useSWR(
        course?.meta.school ? `/schools/${course?.meta.school}` : null,
        schoolFetcher(course?.meta.school)
    );

    const { data: announcements, isValidating: announcementsLoading } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}/announcements` : null,
        announcementsFetcher(queryCourseId as string, { limit: 3 })
    );

    const {
        data: upcomingMeetings,
        isValidating: upcomingMeetingsLoading,
        error: upcomingMeetingsError,
    } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}/meetings?upcoming` : null,
        courseMeetingsFetcher(queryCourseId as string, {
            after: new Date(),
            limit: 3,
        })
    );

    async function handleUpdateCourseVerification(
        verificationStatus: ECourseVerificationStatus
    ) {
        await updateCourseVerification(queryCourseId, verificationStatus);
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

    return (
        <AppLayout
            breadCrumbs={[
                { label: "Courses", href: "/app/courses" },
                { label: course?.title },
            ]}
            actionEl={
                <>
                    <Link
                        href="/app/courses/[id]/meetings"
                        as={`/app/courses/${course?._id}/meetings`}
                    >
                        <a>
                            <Button
                                color="primary"
                                className="spaced-horizontal"
                            >
                                MEETINGS
                            </Button>
                        </a>
                    </Link>
                    <Link
                        href="/app/courses/[id]/announcements"
                        as={`/app/courses/${course?._id}/announcements`}
                    >
                        <a>
                            <Button
                                color="primary"
                                className="spaced-horizontal"
                            >
                                ANNOUNCEMENTS
                            </Button>
                        </a>
                    </Link>

                    {user.role === EUserRoles.INSTRUCTOR && (
                        <Link
                            href="/app/courses/[id]/settings"
                            as={`/app/courses/${course?._id}/settings`}
                        >
                            <a>
                                <IconButton
                                    color="primary"
                                    size="small"
                                    aria-label="Settings"
                                >
                                    <SettingsIcon />
                                </IconButton>
                            </a>
                        </Link>
                    )}
                </>
            }
        >
            <Head>
                <title>{course?.title || "My Course"} - STEM-bound</title>
            </Head>

            <SplitScreen
                mainEl={
                    <>
                        {user.role === EUserRoles.INSTRUCTOR &&
                        course?.verificationStatus ===
                            ECourseVerificationStatus.PENDING_VERIFICATION ? (
                            <Alert severity="info">
                                <AlertTitle>
                                    This course has been published
                                </AlertTitle>
                                "{course.title}" is published and pending
                                verification from a
                                {school?.name ? ` ${school?.name} ` : " "}
                                school official
                            </Alert>
                        ) : null}

                        {user.role === EUserRoles.INSTRUCTOR &&
                        course?.verificationStatus ===
                            ECourseVerificationStatus.DISMISSED ? (
                            <Alert
                                severity="warning"
                                action={
                                    <ContactUserButton
                                        userId={
                                            course.verificationHistory[0].meta
                                                .from
                                        }
                                        color="primary"
                                    >
                                        Contact School official
                                    </ContactUserButton>
                                }
                            >
                                <AlertTitle>
                                    This course has been dismissed
                                </AlertTitle>
                                "{course.title}" was dismissed by a
                                {school?.name ? ` ${school?.name} ` : " "}
                                school official at{" "}
                                {getFormalDateAndTime(
                                    course.verificationHistory[0].createdAt
                                )}
                            </Alert>
                        ) : null}

                        {user.role === EUserRoles.INSTRUCTOR &&
                            course?.verificationStatus ===
                                ECourseVerificationStatus.UNPUBLISHED && (
                                <Alert
                                    severity="info"
                                    action={
                                        <Button
                                            color="primary"
                                            onClick={() =>
                                                handleUpdateCourseVerificationClicked(
                                                    ECourseVerificationStatus.PENDING_VERIFICATION
                                                )
                                            }
                                        >
                                            Publish course
                                        </Button>
                                    }
                                >
                                    <AlertTitle>
                                        This course is not published
                                    </AlertTitle>
                                    Publish "{course.title}" to be verified by a{" "}
                                    {school?.name} school official
                                </Alert>
                            )}

                        {user.role === EUserRoles.SCHOOL_OFFICIAL &&
                            course?.verificationStatus ===
                                ECourseVerificationStatus.PENDING_VERIFICATION && (
                                <Alert
                                    severity="info"
                                    action={
                                        <>
                                            <Button
                                                color="secondary"
                                                onClick={() =>
                                                    handleUpdateCourseVerificationClicked(
                                                        ECourseVerificationStatus.DISMISSED
                                                    )
                                                }
                                            >
                                                Dismiss
                                            </Button>
                                            <Button
                                                color="primary"
                                                onClick={() =>
                                                    handleUpdateCourseVerificationClicked(
                                                        ECourseVerificationStatus.VERIFIED
                                                    )
                                                }
                                            >
                                                Verify
                                            </Button>
                                        </>
                                    }
                                >
                                    <AlertTitle>
                                        This course is pending verification
                                    </AlertTitle>
                                    You may choose to either verify or dismiss
                                    this course.
                                </Alert>
                            )}

                        {announcements?.length ? (
                            <Section
                                title="Recent Announcements"
                                noDivider
                                loading={announcementsLoading}
                            >
                                {announcements.map((announcement) => (
                                    <CourseAnnouncement
                                        announcement={announcement}
                                        key={announcement._id}
                                    />
                                ))}
                            </Section>
                        ) : null}

                        <Section
                            title="Upcoming Meetings"
                            noDivider={!announcements?.length}
                            loading={upcomingMeetingsLoading}
                            infoMessage={
                                upcomingMeetings?.length === 0 &&
                                !upcomingMeetingsError &&
                                "No upcoming meetings"
                            }
                            errorMessage={
                                upcomingMeetingsError &&
                                "Couldn't load upcoming meetings, an error occured"
                            }
                        >
                            {upcomingMeetings?.map((meeting) => (
                                <MeetingCard
                                    courseTitle={course?.title}
                                    schoolName={school?.name}
                                    meeting={meeting}
                                    key={meeting._id}
                                />
                            ))}
                        </Section>
                    </>
                }
                secondaryEl={
                    <>
                        <Section
                            title="Instructors"
                            noDivider
                            loading={instructorsLoading}
                            infoMessage={
                                instructors?.length === 0 &&
                                "No instructors for this course"
                            }
                            errorMessage={
                                instructorsError &&
                                "Couldn't load instructors, an error occured"
                            }
                        >
                            {instructors?.map((instructor) => (
                                <UserCard
                                    user={instructor}
                                    key={instructor._id}
                                    fullWidth
                                    noMargin
                                />
                            ))}
                        </Section>

                        <Section
                            title="Students"
                            loading={studentsLoading}
                            infoMessage={
                                students?.length === 0 && "No students enrolled"
                            }
                            errorMessage={
                                studentsError &&
                                "Couldn't load students, an error occured"
                            }
                        >
                            {students?.map((student) => (
                                <UserCard
                                    user={student}
                                    key={student._id}
                                    fullWidth
                                    noMargin
                                />
                            ))}
                        </Section>
                    </>
                }
            />
        </AppLayout>
    );
};

export default withAuth(CourseAppPage);

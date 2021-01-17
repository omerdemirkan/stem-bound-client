import AppLayout from "../../../../components/containers/AppLayout";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import withAuth from "../../../../components/hoc/withAuth";
import Button from "@material-ui/core/Button";
import ActionBar from "../../../../components/ui/ActionBar";
import Typography from "@material-ui/core/Typography";
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
} from "../../../../utils/services";
import Section from "../../../../components/ui/Section";
import SplitScreen from "../../../../components/ui/SplitScreen";
import { ECourseVerificationStatus, EUserRoles } from "../../../../utils/types";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import useMessaging from "../../../../components/hooks/useMessaging";
import { getFormalDateAndTime } from "../../../../utils/helpers";
import { useContext } from "react";
import AuthContext from "../../../../components/contexts/AuthContext";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";

const CourseAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { user } = useContext(AuthContext);
    const { contactUser } = useMessaging();
    const { data: course } = useSWR(
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
    const {
        data: school,
        isValidating: schoolLoading,
        error: schoolError,
    } = useSWR(
        course?.meta.school ? `/schools/${course?.meta.school}` : null,
        schoolFetcher(course?.meta.school)
    );

    const { data: announcements, isValidating: announcementsLoading } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}/announcements` : null,
        announcementsFetcher(queryCourseId as string)
    );

    const {
        data: upcomingMeetings,
        isValidating: upcomingMeetingsLoading,
        error: upcomingMeetingsError,
    } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}/meetings` : null,
        courseMeetingsFetcher(queryCourseId as string)
    );

    return (
        <AppLayout
            breadCrumbs={[
                { label: "Courses", href: "/app/courses" },
                { label: course?.title },
            ]}
        >
            <Head>
                <title>STEM-bound - {course?.title || "Course"}</title>
            </Head>

            <SplitScreen
                mainEl={
                    <>
                        <ActionBar
                            startEl={
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    align="center"
                                >
                                    {course?.title}
                                </Typography>
                            }
                        >
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
                                    <IconButton
                                        color="primary"
                                        aria-label="Settings"
                                    >
                                        <SettingsIcon />
                                    </IconButton>
                                </Link>
                            )}
                        </ActionBar>

                        {course?.verificationStatus ===
                        ECourseVerificationStatus.PENDING_VERIFICATION ? (
                            <Alert severity="info">
                                <AlertTitle>
                                    This course is pending verification from a
                                    {school?.name ? ` ${school?.name} ` : " "}
                                    school official
                                </AlertTitle>
                            </Alert>
                        ) : null}

                        {course?.verificationStatus ===
                        ECourseVerificationStatus.DISMISSED ? (
                            <Alert
                                severity="warning"
                                action={
                                    <Button
                                        onClick={() =>
                                            contactUser(
                                                course.verificationHistory[0]
                                                    .meta.from
                                            )
                                        }
                                        color="primary"
                                    >
                                        Contact School official
                                    </Button>
                                }
                            >
                                This course has been dismissed by a
                                {school?.name ? ` ${school?.name} ` : " "}
                                school official at{" "}
                                {getFormalDateAndTime(
                                    course.verificationHistory[0].createdAt
                                )}
                            </Alert>
                        ) : null}

                        {announcements?.length ? (
                            <Section
                                title="Recent Announcements"
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
                            spacing={10}
                            title="Upcoming Meetings"
                            loading={upcomingMeetingsLoading}
                            infoMessage={
                                upcomingMeetings?.length === 0 &&
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
                            spacing={8}
                            title="Instructors"
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
                                />
                            ))}
                        </Section>

                        <Section
                            spacing={8}
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
                                <UserCard user={student} key={student._id} />
                            ))}
                        </Section>
                    </>
                }
            />
        </AppLayout>
    );
};

export default withAuth(CourseAppPage);

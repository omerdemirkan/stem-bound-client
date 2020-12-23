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

const CourseAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );
    const {
        data: courseInstructors,
        isValidating: instructorsLoading,
    } = useSWR(
        course?._id ? `/courses/${course?._id}/instructors` : null,
        courseInstructorsFetcher(course?._id)
    );
    const { data: courseStudents, isValidating: studentsLoading } = useSWR(
        course?._id ? `/courses/${course?._id}/students` : null,
        courseStudentsFetcher(course?._id)
    );
    const { data: school, isValidating: schoolLoading } = useSWR(
        course?.meta.school ? `/schools/${course?.meta.school}` : null,
        schoolFetcher(course?.meta.school)
    );

    let { data: announcements, isValidating: announcementsLoading } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}/announcements` : null,
        announcementsFetcher(queryCourseId as string)
    );

    let { data: meetings, isValidating: meetingsLoading } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}/meetings` : null,
        courseMeetingsFetcher(queryCourseId as string)
    );

    announcements = announcements || course?.announcements;
    meetings = meetings || course?.meetings;

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
                                        variant="contained"
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
                                        variant="contained"
                                        color="primary"
                                        className="spaced-horizontal"
                                    >
                                        ANNOUNCEMENTS
                                    </Button>
                                </a>
                            </Link>
                        </ActionBar>

                        {announcements?.length ? (
                            <Section
                                title="Recent Announcements"
                                loading={announcementsLoading}
                                empty={!announcements}
                            >
                                {course.announcements.map((announcement) => (
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
                            loading={meetingsLoading}
                            empty={!meetings}
                        >
                            {meetings?.map((meeting) => (
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
                            empty={!courseInstructors}
                        >
                            {courseInstructors?.map((instructor) => (
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
                            empty={!courseStudents}
                        >
                            {courseStudents?.map((student) => (
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

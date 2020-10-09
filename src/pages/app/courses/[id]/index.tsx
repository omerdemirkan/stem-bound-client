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
    courseFetcher,
    courseInstructorsFetcher,
    courseStudentsFetcher,
    schoolFetcher,
} from "../../../../utils/services";

const CourseAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );
    const { data: courseInstructors } = useSWR(
        course?._id ? `/courses/${course?._id}/instructors` : null,
        courseInstructorsFetcher(course?._id)
    );
    const { data: courseStudents } = useSWR(
        course?._id ? `/courses/${course?._id}/students` : null,
        courseStudentsFetcher(course?._id)
    );
    const { data: school } = useSWR(
        course?.meta.school ? `/schools/${course?.meta.school}` : null,
        schoolFetcher(course?.meta.school)
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

            <div className="page-container">
                <div>
                    <ActionBar
                        startEl={
                            <Typography
                                variant="h4"
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
                                <Button variant="contained">MEETINGS</Button>
                            </a>
                        </Link>
                        <Link
                            href="/app/courses/[id]/announcements"
                            as={`/app/courses/${course?._id}/announcements`}
                        >
                            <a>
                                <Button variant="contained">
                                    ANNOUNCEMENTS
                                </Button>
                            </a>
                        </Link>
                    </ActionBar>

                    {course?.announcements.length ? (
                        <>
                            <Typography variant="h5" gutterBottom>
                                Recent Announcements
                            </Typography>
                            {course.announcements.map((announcement) => (
                                <CourseAnnouncement
                                    announcement={announcement}
                                    key={announcement._id}
                                />
                            ))}
                        </>
                    ) : null}

                    <Typography variant="h5" gutterBottom>
                        Upcoming Meetings
                    </Typography>
                    {course?.meetings.map((meeting) => (
                        <MeetingCard
                            courseTitle={course?.title}
                            schoolName={school?.name}
                            meeting={meeting}
                            key={meeting._id}
                        />
                    ))}
                </div>
                <aside>
                    <Typography variant="h6" align="center" gutterBottom>
                        Instructors
                    </Typography>
                    {courseInstructors?.map((instructor) => (
                        <UserCard user={instructor} key={instructor._id} />
                    ))}
                    <Typography variant="h6" align="center" gutterBottom>
                        Students
                    </Typography>
                    {courseStudents?.map((instructor) => (
                        <UserCard user={instructor} key={instructor._id} />
                    ))}
                </aside>
            </div>

            <style jsx>{`
                .page-container {
                    display: grid;
                    grid-template-columns: auto 400px;
                    grid-gap: 50px;
                }

                .page-container > aside {
                    overflow-x: hidden;
                    overflow-y: auto;
                }

                @media (max-width: 1200px) {
                    .page-container {
                        grid-template-columns: 100%;
                    }
                }
            `}</style>
        </AppLayout>
    );
};

export default withAuth(CourseAppPage);

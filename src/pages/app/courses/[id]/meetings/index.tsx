import AppLayout from "../../../../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../../../../components/hoc/withAuth";
import useSWR from "swr";
import AuthContext from "../../../../../components/contexts/AuthContext";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { useContext } from "react";
import {
    courseFetcher,
    courseMeetingsFetcher,
    schoolFetcher,
} from "../../../../../utils/services";
import MeetingCard from "../../../../../components/ui/MeetingCard";

const MeetingsAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course, error: fetchCourseError } = useSWR(
        queryCourseId && `/courses/${queryCourseId}`,
        courseFetcher(queryCourseId as any)
    );
    const { data: meetings, error: fetchCourseMeetingsError } = useSWR(
        queryCourseId && `/courses/${queryCourseId}/meetings`,
        courseMeetingsFetcher({ courseId: queryCourseId as any })
    );
    const { data: school } = useSWR(
        course?.meta.school && `/schools/${course?.meta.school}`,
        schoolFetcher(course?.meta.school)
    );
    const { user } = useContext(AuthContext);

    return (
        <AppLayout
            breadCrumbs={[
                { label: "Courses", href: "/app/courses" },
                {
                    label: course?.title,
                    href: "/app/courses/[id]",
                    as: `/app/courses/${course?._id}`,
                },
                { label: "Meetings" },
            ]}
        >
            <Head>
                <title>STEM-bound - {course?.title || "Course"}</title>
            </Head>

            {course?.meta.instructors.includes(user._id) ? (
                <>
                    <Link
                        href="/app/courses/[id]/meetings/create"
                        as={`/app/courses/${course?._id}/meetings/create`}
                    >
                        <a>
                            <Button variant="contained" color="primary">
                                CREATE MEETINGS
                            </Button>
                        </a>
                    </Link>
                    <Link
                        href="/app/courses/[id]/meetings/update"
                        as={`/app/courses/${course?._id}/meetings/update`}
                        shallow
                    >
                        <a>
                            <Button variant="contained" color="primary">
                                UPDATE MEETINGS
                            </Button>
                        </a>
                    </Link>
                </>
            ) : null}

            {meetings?.map((meeting) => (
                <MeetingCard
                    meeting={meeting}
                    key={meeting._id}
                    courseTitle={course?.title}
                    schoolName={school?.name}
                />
            ))}
        </AppLayout>
    );
};

export default withAuth(MeetingsAppPage);

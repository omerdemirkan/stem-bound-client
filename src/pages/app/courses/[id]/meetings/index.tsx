import AppLayout from "../../../../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../../../../components/hoc/withAuth";
import useSWR from "swr";
import { useRouter } from "next/router";
import {
    courseFetcher,
    courseMeetingsFetcher,
} from "../../../../../utils/services";
import { useContext } from "react";
import AuthContext from "../../../../../components/contexts/AuthContext";
import Link from "next/link";

const MeetingsAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course, error: fetchCourseError } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );
    const { data: meetings, error: fetchCourseMeetingsError } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}/meetings` : null,
        courseMeetingsFetcher({ courseId: queryCourseId as any })
    );
    const { user } = useContext(AuthContext);

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - {course?.title || "Course"}</title>
            </Head>
            <h4>{course?.title} meetings</h4>

            {course?.meta.instructors.includes(user._id) ? (
                <Link
                    href="/app/courses/[id]/meetings/create"
                    as={`/app/courses/${course?._id}/meetings/create`}
                >
                    <a>
                        <button>CREATE MEETINGS</button>
                    </a>
                </Link>
            ) : null}

            <pre>{JSON.stringify(meetings || course?.meetings, null, 2)}</pre>
        </AppLayout>
    );
};

export default withAuth(MeetingsAppPage);

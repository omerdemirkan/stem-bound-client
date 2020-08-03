import AppLayout from "../../../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../../../components/hoc/withAuth";
import useSWR from "swr";
import { useRouter } from "next/router";
import {
    courseFetcher,
    courseMeetingsFetcher,
} from "../../../../utils/services";

const MeetingsAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course, error: fetchCourseError } = useSWR(
        queryCourseId ? `/api/v1/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );
    const { data: meetings, error: fetchCourseMeetingsError } = useSWR(
        queryCourseId ? `/api/v1/courses/${queryCourseId}/meetings` : null,
        courseMeetingsFetcher({ courseId: queryCourseId as any })
    );

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - {course?.title || "Course"}</title>
            </Head>
            <h4>{course?.title} meetings</h4>
            <pre>{JSON.stringify(meetings || course?.meetings, null, 2)}</pre>
        </AppLayout>
    );
};

export default withAuth(MeetingsAppPage);

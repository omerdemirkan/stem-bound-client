import AppLayout from "../../../../components/containers/AppLayout";
import withAuth from "../../../../components/hoc/withAuth";
import { useRouter } from "next/router";
import useSWR from "swr";
import { courseFetcher } from "../../../../utils/services";
import Head from "next/head";

const AnnouncementsAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course, error: fetchCourseError } = useSWR(
        queryCourseId ? `/api/v1/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - Announcements</title>
            </Head>
            <h4>announcements</h4>
        </AppLayout>
    );
};

export default withAuth(AnnouncementsAppPage);

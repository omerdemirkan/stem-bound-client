import AppLayout from "../../../../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../../../../components/hoc/withAuth";
import useSWR from "swr";
import AnnouncementCard from "../../../../../components/ui/AnnouncementCard";
import { useRouter } from "next/router";
import {
    courseFetcher,
    announcementsFetcher,
} from "../../../../../utils/services";

const AnnouncementsAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course, error: fetchCourseError } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );
    const { data: announcements } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}/announcements` : null,
        announcementsFetcher(queryCourseId as any),
        { initialData: course?.announcements }
    );

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - Announcements</title>
            </Head>
            <h4>announcements</h4>
            {announcements?.map((announcement) => (
                <AnnouncementCard announcement={announcement} />
            ))}
        </AppLayout>
    );
};

export default withAuth(AnnouncementsAppPage);

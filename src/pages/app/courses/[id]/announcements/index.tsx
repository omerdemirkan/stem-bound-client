import AppLayout from "../../../../../components/containers/AppLayout";
import Head from "next/head";
import Link from "next/link";
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
    const {
        data: announcements,
        error: fetchAnnouncementsError,
    } = useSWR(
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
            <Link
                href="/app/courses/[id]/announcements/create"
                as={`/app/courses/${course?._id}/announcements/create`}
            >
                <a>
                    <button>CREATE</button>
                </a>
            </Link>
            {announcements?.map((announcement) => (
                <AnnouncementCard
                    key={announcement._id}
                    announcement={announcement}
                />
            ))}
        </AppLayout>
    );
};

export default withAuth(AnnouncementsAppPage);

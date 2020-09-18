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
} from "../../../../../utils/services";

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
                <Link
                    href="/app/courses/[id]/meetings/update"
                    as={`/app/courses/${course?._id}/meetings/update`}
                >
                    <a>
                        <Button variant="contained">
                            CREATE/UDPATE MEETINGS
                        </Button>
                    </a>
                </Link>
            ) : null}

            <pre>{JSON.stringify(meetings || course?.meetings, null, 2)}</pre>
        </AppLayout>
    );
};

export default withAuth(MeetingsAppPage);

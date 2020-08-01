import AppLayout from "../../../../components/containers/AppLayout";
import Link from "next/link";
import useSWR from "swr";
import withAuth from "../../../../components/hoc/withAuth";
import { useRouter } from "next/router";
import { courseFetcher } from "../../../../utils/services";
import { IWithAuthProps } from "../../../../utils/types";

const CourseAppPage: React.FC<IWithAuthProps> = ({
    authAttempted,
    accessToken,
    user,
}) => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course, error } = useSWR(
        queryCourseId ? `/api/v1/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );

    return (
        <AppLayout>
            <h4>{course?.title}</h4>
            <pre>{JSON.stringify(course, null, 2)}</pre>
            <Link
                href="/app/courses/[id]/meetings"
                as={`/app/courses/${course?._id}/meetings`}
            >
                <a>
                    <button>MEETINGS</button>
                </a>
            </Link>
            <Link
                href="/app/courses/[id]/announcements"
                as={`/app/courses/${course?._id}/announcements`}
            >
                <a>
                    <button>ANNOUNCEMENTS</button>
                </a>
            </Link>
        </AppLayout>
    );
};

export default withAuth(CourseAppPage);

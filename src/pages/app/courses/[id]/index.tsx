import AppLayout from "../../../../components/containers/AppLayout";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import withAuth from "../../../../components/hoc/withAuth";
import { useRouter } from "next/router";
import { courseFetcher } from "../../../../utils/services";
import Button from "@material-ui/core/Button";

const CourseAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course, error } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
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
            <h4>{course?.title}</h4>
            <pre>{JSON.stringify(course, null, 2)}</pre>
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
                    <Button variant="contained">ANNOUNCEMENTS</Button>
                </a>
            </Link>
        </AppLayout>
    );
};

export default withAuth(CourseAppPage);

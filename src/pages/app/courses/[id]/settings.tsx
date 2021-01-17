import useSWR from "swr";
import AppLayout from "../../../../components/containers/AppLayout";
import AuthContext from "../../../../components/contexts/AuthContext";
import withAuth from "../../../../components/hoc/withAuth";
import ActionBar from "../../../../components/ui/ActionBar";
import Typography from "@material-ui/core/Typography";
import { courseFetcher, updateCourseById } from "../../../../utils/services";
import { EUserRoles, ICourseOriginal } from "../../../../utils/types";
import { useRouter } from "next/router";
import { useContext } from "react";
import Section from "../../../../components/ui/Section";

const CourseSettingsAppPage: React.FC = () => {
    const router = useRouter();
    const courseId = router.query.id as string;
    const { user } = useContext(AuthContext);
    const { data: course, revalidate: refetchCourse } = useSWR(
        courseId ? `/courses/${courseId}` : null,
        courseFetcher(courseId)
    );

    async function handleCourseUpdate(courseUpdates: Partial<ICourseOriginal>) {
        await updateCourseById(courseId, courseUpdates);
        refetchCourse();
    }
    return (
        <AppLayout
            breadCrumbs={[
                { label: "Courses", href: "/app/courses" },
                {
                    label: course?.title,
                    href: "/app/courses/[id]",
                    as: `/app/courses/${course?._id}`,
                },
                { label: "Settings" },
            ]}
        >
            <ActionBar
                startEl={<Typography variant="h5">Course Settings</Typography>}
            ></ActionBar>
        </AppLayout>
    );
};

export default withAuth(CourseSettingsAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

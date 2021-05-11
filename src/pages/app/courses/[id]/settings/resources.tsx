import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { CourseSettingsLayout } from ".";
import NotificationContext from "../../../../../components/contexts/NotificationContext";
import withAuth from "../../../../../components/hoc/withAuth";
import CourseResourcesInput from "../../../../../components/util/CourseResourcesInput";
import { courseFetcher, updateCourseById } from "../../../../../utils/services";
import {
    EUserRoles,
    ICourseOriginal,
    ICourseResource,
} from "../../../../../utils/types";

const CourseResourcesAppPage: React.FC = () => {
    const router = useRouter();
    const courseId = router.query.id as string;

    const { createSnackbar } = useContext(NotificationContext);

    const { data: course, revalidate: refetchCourse } = useSWR(
        courseId ? `/courses/${courseId}` : null,
        courseFetcher(courseId)
    );

    const [resources, setResources] = useState<ICourseResource[]>([]);

    useEffect(
        function () {
            if (!course) return;
            setResources(course.resources);
        },
        [!!course]
    );

    async function handleCourseUpdate(courseUpdates: Partial<ICourseOriginal>) {
        await updateCourseById(courseId, courseUpdates);
        refetchCourse();
    }

    async function handleCourseResourcesChange(newResources) {
        setResources(newResources);
        try {
            handleCourseUpdate({ resources: newResources });
            createSnackbar({
                type: "success",
                text: "Successfully updated resources",
            });
        } catch (e) {
            createSnackbar({
                type: "error",
                text: "Couldn't update course resources",
            });
        }
    }

    return (
        <CourseSettingsLayout
            activeLabel="Resources"
            courseId={course?._id}
            courseTitle={course?.title}
        >
            <Head>
                <title>STEM-bound - Resources</title>
            </Head>
            <CourseResourcesInput
                value={resources}
                onChange={handleCourseResourcesChange}
            />
        </CourseSettingsLayout>
    );
};

export default withAuth(CourseResourcesAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

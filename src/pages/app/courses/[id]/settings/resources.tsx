import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { CourseSettingsLayout } from ".";
import withAuth from "../../../../../components/hoc/withAuth";
import CourseResourcesInput from "../../../../../components/util/CourseResourcesInput";
import { courseFetcher } from "../../../../../utils/services";
import { EUserRoles, ICourseResource } from "../../../../../utils/types";

const CourseResourcesAppPage: React.FC = () => {
    const router = useRouter();
    const courseId = router.query.id as string;

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

    return (
        <CourseSettingsLayout
            activeLabel="Resources"
            courseId={course?._id}
            courseTitle={course?.title}
        >
            <CourseResourcesInput value={resources} onChange={setResources} />
        </CourseSettingsLayout>
    );
};

export default withAuth(CourseResourcesAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

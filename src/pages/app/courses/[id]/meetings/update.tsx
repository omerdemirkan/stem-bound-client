import AppLayout from "../../../../../components/containers/AppLayout";
import useSWR from "swr";
import withAuth from "../../../../../components/hoc/withAuth";
import { useRouter } from "next/router";
import {
    schoolFetcher,
    courseFetcher,
    courseMeetingsFetcher,
} from "../../../../../utils/services";
import { EUserRoles } from "../../../../../utils/types";
import MeetingInput from "../../../../../components/ui/MeetingInput";

const UpdateMeetingAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as string)
    );
    const { data: meetings, error: fetchCourseMeetingsError } = useSWR(
        queryCourseId && `/courses/${queryCourseId}/meetings`,
        courseMeetingsFetcher({ courseId: queryCourseId as any })
    );
    const { data: school } = useSWR(
        course?.meta.school && `/schools/${course?.meta.school}`,
        schoolFetcher(course?.meta.school)
    );

    return (
        <AppLayout
            breadCrumbs={[
                { label: "Courses", href: "/app/courses" },
                {
                    label: course?.title,
                    href: "/app/courses/[id]",
                    as: `/app/courses/${course?._id}`,
                },
                {
                    label: "Meetings",
                    href: "/app/courses/[id]/meetings",
                    as: `/app/courses/${course?._id}/meetings`,
                },
                { label: "Update" },
            ]}
        >
            {meetings?.map((meeting) => (
                <MeetingInput
                    meeting={meeting}
                    courseTitle={course?.title}
                    onChange={console.log}
                    schoolName={school?.name}
                    onDelete={console.log}
                />
            ))}
        </AppLayout>
    );
};

export default withAuth(UpdateMeetingAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

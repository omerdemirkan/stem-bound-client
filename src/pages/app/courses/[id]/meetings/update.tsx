import AppLayout from "../../../../../components/containers/AppLayout";
import useSWR from "swr";
import withAuth from "../../../../../components/hoc/withAuth";
import { useRouter } from "next/router";
import {
    schoolFetcher,
    courseFetcher,
    courseMeetingsFetcher,
    deleteMeetingById,
} from "../../../../../utils/services";
import { ENotificationTypes, EUserRoles } from "../../../../../utils/types";
import MeetingInput from "../../../../../components/ui/MeetingInput";
import { useContext } from "react";
import NotificationContext from "../../../../../components/contexts/NotificationContext";

const UpdateMeetingAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as string)
    );
    const { data: meetings, mutate: mutateMeetings } = useSWR(
        queryCourseId && `/courses/${queryCourseId}/meetings`,
        courseMeetingsFetcher({ courseId: queryCourseId as any })
    );
    const { data: school } = useSWR(
        course?.meta.school && `/schools/${course?.meta.school}`,
        schoolFetcher(course?.meta.school)
    );

    const { createSnackbar } = useContext(NotificationContext);

    async function handleDeleteCourse(meetingId: string) {
        console.log("inside handleDeleteCOurse");
        await deleteMeetingById({ meetingId, courseId: course._id });
        createSnackbar({
            text: "Meeting has been deleted",
            type: ENotificationTypes.SUCCESS,
        });
        mutateMeetings((prev) =>
            prev.filter((meeting) => meeting._id !== meetingId)
        );
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
                    key={meeting._id}
                    meeting={meeting}
                    courseTitle={course?.title}
                    onChange={console.log}
                    schoolName={school?.name}
                    onDelete={handleDeleteCourse}
                    DeleteAlertData={{
                        headerText:
                            "Are you sure you want to delete this meeting?",
                        bodyText: "This cannot be undone.",
                    }}
                />
            ))}
        </AppLayout>
    );
};

export default withAuth(UpdateMeetingAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

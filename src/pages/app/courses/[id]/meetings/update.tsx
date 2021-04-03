import AppLayout from "../../../../../components/containers/AppLayout";
import useSWR from "swr";
import withAuth from "../../../../../components/hoc/withAuth";
import { useRouter } from "next/router";
import {
    courseFetcher,
    courseMeetingsFetcher,
    deleteMeetingById,
    updateMeetingById,
} from "../../../../../utils/services";
import { EUserRoles, IMeetingOriginal } from "../../../../../utils/types";
import MeetingInput from "../../../../../components/util/MeetingInput";
import { useContext, useRef } from "react";
import NotificationContext from "../../../../../components/contexts/NotificationContext";
import { clone } from "../../../../../utils/helpers";
import PictureMessage from "../../../../../components/ui/PictureMessage";
import NoResultsSVG from "../../../../../components/svg/illustrations/no-results";
import Section from "../../../../../components/ui/Section";
import Head from "next/head";
import useSchool from "../../../../../hooks/useSchool";

const UpdateMeetingAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const nowRef = useRef<Date>();
    nowRef.current = nowRef.current || new Date();
    const { data: course } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as string)
    );
    const {
        data: meetings,
        mutate: mutateMeetings,
        isValidating: meetingsLoading,
    } = useSWR(
        queryCourseId && `/courses/${queryCourseId}/meetings?type=upcoming`,
        courseMeetingsFetcher(queryCourseId as string, {
            after: nowRef.current,
        })
    );
    const { school } = useSchool(course?.meta.school);

    const { createSnackbar } = useContext(NotificationContext);

    async function handleDeleteCourse(meetingId: string) {
        await deleteMeetingById({ meetingId, courseId: course._id });
        createSnackbar({
            text: "Meeting successfully deleted",
            type: "success",
        });
        mutateMeetings((prev) =>
            prev.filter((meeting) => meeting._id !== meetingId)
        );
    }

    async function handleUpdateCourse(meetingData: IMeetingOriginal) {
        const { data: updatedMeeting } = await updateMeetingById(meetingData, {
            courseId: course._id,
            meetingId: meetingData._id,
        });
        createSnackbar({
            text: "Meeting successfully updated",
            type: "success",
        });
        mutateMeetings(function (previousMeetings) {
            const newMeetings = clone(previousMeetings);
            newMeetings[
                newMeetings.findIndex(
                    (meeting) => meeting._id === updatedMeeting._id
                )
            ] = updatedMeeting;
            return newMeetings;
        });
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
            <Head>
                <title>Update Meetings - STEM-bound</title>
            </Head>
            <Section title="Update Upcoming Meetings" noDivider>
                {meetings?.map((meeting) => (
                    <MeetingInput
                        key={meeting._id}
                        meeting={meeting}
                        courseTitle={course?.title}
                        onChange={handleUpdateCourse}
                        schoolName={school?.name}
                        onDelete={handleDeleteCourse}
                        DeleteAlertData={{
                            headerText:
                                "Are you sure you want to delete this meeting?",
                            bodyText: "This cannot be undone.",
                        }}
                    />
                ))}
            </Section>
            {!meetingsLoading && !meetings?.length && (
                <PictureMessage
                    Svg={NoResultsSVG}
                    message="No meetings found"
                />
            )}
        </AppLayout>
    );
};

export default withAuth(UpdateMeetingAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

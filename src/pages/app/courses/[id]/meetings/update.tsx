import AppLayout from "../../../../../components/containers/AppLayout";
import useSWR from "swr";
import MeetingsForm from "../../../../../components/containers/MeetingsForm";
import moment from "moment";
import withAuth from "../../../../../components/hoc/withAuth";
import { useRouter } from "next/router";
import {
    createMeetings,
    courseFetcherUnmapped,
    schoolFetcher,
} from "../../../../../utils/services";
import {
    IMeetingOriginal,
    ECourseTypes,
    EMeetingTypes,
    EUserRoles,
} from "../../../../../utils/types";
import {
    clone,
    mapMeetingData,
    removeEmptyStrings,
} from "../../../../../utils/helpers";

const UpdateMeetingAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course, error, mutate: mutateCourse } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}#unmapped` : null,
        courseFetcherUnmapped(queryCourseId as any)
    );
    const { data: school } = useSWR(
        course?.meta.school && `/schools/${course?.meta.school}`,
        schoolFetcher(course?.meta.school)
    );

    function handleSubmit(meetings: IMeetingOriginal[]) {
        createMeetings(removeEmptyStrings(meetings), {
            courseId: course._id,
        }).then(function ({ data }) {
            const newCourse = clone(course);
            Object.assign(newCourse, {
                meetings: data.map(mapMeetingData as any),
            });
            mutateCourse(newCourse);
            router.push(`/app/courses/${course._id}/meetings`);
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
            {course ? (
                <MeetingsForm
                    defaultMeetingType={
                        course.type === ECourseTypes.REMOTE
                            ? EMeetingTypes.REMOTE
                            : EMeetingTypes.IN_PERSON
                    }
                    initialMeetingInputs={course.meetings.map((meeting) => ({
                        ...meeting,
                        dateKey: moment(meeting.start)
                            .startOf("day")
                            .toString(),
                    }))}
                    courseTitle={course?.title}
                    schoolName={school?.name}
                    courseType={course.type}
                    onSubmit={handleSubmit}
                />
            ) : null}
        </AppLayout>
    );
};

export default withAuth(UpdateMeetingAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

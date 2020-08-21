import AppLayout from "../../../../../components/containers/AppLayout";
import useSWR from "swr";
import MeetingsForm from "../../../../../components/containers/MeetingsForm";
import { useRouter } from "next/router";
import {
    createMeetings,
    courseFetcherUnmapped,
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
import moment from "moment";
import withAuth from "../../../../../components/hoc/withAuth";

const UpdateMeetingAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course, error, mutate: mutateCourse } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}#unmapped` : null,
        courseFetcherUnmapped(queryCourseId as any)
    );

    function handleSubmit(meetings: IMeetingOriginal[]) {
        createMeetings(removeEmptyStrings(meetings), {
            courseId: course._id,
        }).then(function ({ data }) {
            const newCourse = clone(course);
            Object.assign(newCourse, { meetings: data.map(mapMeetingData) });
            mutateCourse(newCourse);
            router.push(`/app/courses/${course._id}/meetings`);
        });
    }

    return (
        <AppLayout>
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
                    onSubmit={handleSubmit}
                />
            ) : null}
        </AppLayout>
    );
};

export default withAuth(UpdateMeetingAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

import AppLayout from "../../../../../components/containers/AppLayout";
import useSWR from "swr";
import MeetingsForm from "../../../../../components/containers/MeetingsForm";
import { useRouter } from "next/router";
import { courseFetcher, createMeetings } from "../../../../../utils/services";
import { IMeetingOriginal } from "../../../../../utils/types";
import {
    clone,
    mapMeetingData,
    removeEmptyStrings,
} from "../../../../../utils/helpers";

const CreateMeetingAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course, error, mutate: mutateCourse } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );

    function handleSubmit(meetings: IMeetingOriginal[]) {
        createMeetings(removeEmptyStrings(meetings), {
            courseId: course._id,
        }).then(function ({ data }) {
            const newCourse = clone(course);
            Object.assign(newCourse, { meetings: data.map(mapMeetingData) });
            mutateCourse(newCourse);
            router.push("");
        });
    }

    return (
        <AppLayout>
            <MeetingsForm course={course} onSubmit={handleSubmit} />
        </AppLayout>
    );
};

export default CreateMeetingAppPage;

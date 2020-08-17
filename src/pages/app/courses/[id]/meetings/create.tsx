import AppLayout from "../../../../../components/containers/AppLayout";
import useSWR from "swr";
import MeetingsInput from "../../../../../components/containers/MeetingsInput";
import { useRouter } from "next/router";
import { courseFetcher } from "../../../../../utils/services";

const CreateMeetingAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course, error } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );

    return (
        <AppLayout>
            <MeetingsInput course={course} onChange={() => {}} />
        </AppLayout>
    );
};

export default CreateMeetingAppPage;

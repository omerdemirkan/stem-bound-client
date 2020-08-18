import AppLayout from "../../../../../components/containers/AppLayout";
import useSWR from "swr";
import MeetingsInput from "../../../../../components/containers/MeetingsInput";
import { useRouter } from "next/router";
import { courseFetcher } from "../../../../../utils/services";
import { useState } from "react";
import { IMeetingOriginal } from "../../../../../utils/types";

const CreateMeetingAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const [meetings, setMeetings] = useState<IMeetingOriginal[]>([]);
    const { data: course, error } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );
    console.log(meetings);

    return (
        <AppLayout>
            <MeetingsInput course={course} onChange={setMeetings} />
        </AppLayout>
    );
};

export default CreateMeetingAppPage;

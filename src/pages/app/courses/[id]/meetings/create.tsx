import AppLayout from "../../../../../components/containers/AppLayout";
import MultiDatePicker from "../../../../../components/ui/MultiDatePicker";
import { useState } from "react";

const CreateMeetingAppPage: React.FC = () => {
    const [dates, setDates] = useState<moment.Moment[]>([]);
    return (
        <AppLayout>
            <MultiDatePicker onChange={setDates} />
        </AppLayout>
    );
};

export default CreateMeetingAppPage;

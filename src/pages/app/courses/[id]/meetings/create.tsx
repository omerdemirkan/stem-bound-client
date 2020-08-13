import AppLayout from "../../../../../components/containers/AppLayout";
import MultiDatePicker from "../../../../../components/ui/MultiDatePicker";
import SingleDatePicker from "../../../../../components/ui/SingleDatePicker";
import TimePicker from "../../../../../components/ui/TimePicker";
import { useState } from "react";
import { IMeetingOriginal } from "../../../../../utils/types";

const CreateMeetingAppPage: React.FC = () => {
    const [meetings, setMeetings] = useState<
        Partial<IMeetingOriginal & { dateKey: string }>[]
    >([]);

    function constructDefaultMeeting(
        date: moment.Moment
    ): Partial<IMeetingOriginal & { dateKey: string }> {
        return {
            dateKey: date.toString(),
        };
    }

    function handleDatesUpdate(dates: moment.Moment[]) {
        if (dates.length === meetings.length) return;
        const meetingWasRemoved = dates.length < meetings.length;

        if (meetingWasRemoved) {
            const newDateKeysHashTable = {};
            dates.forEach(function (date) {
                newDateKeysHashTable[date.toString()] = true;
            });
            setMeetings((previous) =>
                previous.filter(
                    (meeting) => newDateKeysHashTable[meeting.dateKey]
                )
            );
        } else {
            const oldDateKeysHashTable = {};
            meetings.forEach(function (meeting) {
                oldDateKeysHashTable[meeting.dateKey] = true;
            });
            let newDate: moment.Moment = dates.find(
                (date) => !oldDateKeysHashTable[date.toString()]
            );
            const newMeeting = constructDefaultMeeting(newDate);
            setMeetings((previous) => [...previous, newMeeting]);
        }
    }

    return (
        <AppLayout>
            <TimePicker onChange={console.log} label="Start" />
            <TimePicker onChange={console.log} label="End" />
            <MultiDatePicker onChange={handleDatesUpdate} />
            <SingleDatePicker id="Date" onChange={console.log} />
        </AppLayout>
    );
};

export default CreateMeetingAppPage;

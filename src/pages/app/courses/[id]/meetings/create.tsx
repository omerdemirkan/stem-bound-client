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
            setMeetings((previousMeetings) => {
                let newMeetings = [];
                const oldDateKeysHashTable = {};

                previousMeetings.forEach(function (meeting) {
                    oldDateKeysHashTable[meeting.dateKey] = meeting;
                });

                dates.forEach((date) =>
                    newMeetings.push(
                        oldDateKeysHashTable[date.toString()] ||
                            constructDefaultMeeting(date)
                    )
                );

                return newMeetings;
            });
        }
    }

    return (
        <AppLayout>
            <TimePicker onChange={console.log} label="Start" />
            <TimePicker onChange={console.log} label="End" />
            <MultiDatePicker
                onChange={handleDatesUpdate}
                sortOrder="descending"
            />
            <SingleDatePicker id="Date" onChange={console.log} />
            <pre>{JSON.stringify(meetings, null, 2)}</pre>
        </AppLayout>
    );
};

export default CreateMeetingAppPage;

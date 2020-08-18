import MultiDatePicker from "../../components/ui/MultiDatePicker";
import SingleDatePicker from "../../components/ui/SingleDatePicker";
import AlertBar from "../../components/ui/AlertBar";
import MeetingInput from "../../components/ui/MeetingInput";
import TimeRangePicker from "../ui/TimeRangePicker";
import { useState, useEffect } from "react";
import {
    IMeetingOriginal,
    ECourseTypes,
    EMeetingTypes,
    ICourse,
    ITimeStringRange,
} from "../../utils/types";
import { getTimeStringValues } from "../../utils/helpers/date.helpers";
import { clone } from "../../utils/helpers";

interface Props {
    course: ICourse;
    onChange: (meetings: IMeetingOriginal[]) => any;
}

const MeetingsInput: React.FC<Props> = ({ course, onChange }) => {
    const [meetings, setMeetings] = useState<
        (IMeetingOriginal & { dateKey: string })[]
    >([]);

    const [timeRange, setTimeRange] = useState<ITimeStringRange>({
        start: "03:00",
        end: "04:00",
    });

    useEffect(() => onChange(meetings));

    function constructDefaultMeeting(
        date: moment.Moment
    ): IMeetingOriginal & { dateKey: string } {
        const {
            hours: startHours,
            minutes: startMinutes,
        } = getTimeStringValues(timeRange.start);
        const { hours: endHours, minutes: endMinutes } = getTimeStringValues(
            timeRange.end
        );

        return {
            dateKey: date.toString(),
            start: new Date(
                date.toDate().setMinutes(startHours * 60 + startMinutes)
            ),
            end: new Date(date.toDate().setMinutes(endHours * 60 + endMinutes)),
            message: "",
            type:
                course?.type.original === ECourseTypes.REMOTE
                    ? EMeetingTypes.REMOTE
                    : EMeetingTypes.IN_PERSON,
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

    function handleMeetingChange(
        newMeeting: IMeetingOriginal & { dateKey: string }
    ) {
        setMeetings((prev) => {
            const newMeetings = clone(prev);
            newMeetings[
                newMeetings.findIndex(
                    (meeting) => meeting.dateKey === newMeeting.dateKey
                )
            ] = newMeeting;
            return newMeetings;
        });
    }

    return (
        <>
            <AlertBar
                finePrint="You can later update meetings individually"
                type="info"
            >
                Choose time and days
            </AlertBar>

            <TimeRangePicker value={timeRange} onChange={setTimeRange} />

            <MultiDatePicker
                onChange={handleDatesUpdate}
                sortOrder="ascending"
            />

            <SingleDatePicker id="Date" onChange={() => {}} />

            {meetings.map((meeting) => (
                <MeetingInput
                    meeting={meeting}
                    onChange={handleMeetingChange}
                    key={meeting.dateKey}
                />
            ))}

            <pre>{JSON.stringify(meetings, null, 2)}</pre>
        </>
    );
};

export default MeetingsInput;

import MultiDatePicker from "../ui/MultiDatePicker";
import SingleDatePicker from "../ui/SingleDatePicker";
import AlertBar from "../ui/AlertBar";
import MeetingInput from "../ui/MeetingInput";
import TimeRangePicker from "../ui/TimeRangePicker";
import { useState, useEffect } from "react";
import { getTimeStringValues } from "../../utils/helpers/date.helpers";
import { clone } from "../../utils/helpers";
import {
    IMeetingOriginal,
    ECourseTypes,
    EMeetingTypes,
    ICourse,
    ITimeStringRange,
} from "../../utils/types";
import Input from "../ui/Input";

interface Props {
    course: ICourse;
    onChange?: (meetings: IMeetingOriginal[]) => any;
    onSubmit?: (meetings: IMeetingOriginal[]) => any;
}

const MeetingsForm: React.FC<Props> = ({ course, onChange, onSubmit }) => {
    const [meetings, setMeetings] = useState<
        (IMeetingOriginal & { dateKey: string })[]
    >([]);

    const [timeRange, setTimeRange] = useState<ITimeStringRange>({
        start: "03:00",
        end: "04:00",
    });

    const [roomNum, setRoomNum] = useState<string>();

    useEffect(() => onChange && onChange(meetings));

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
            roomNum: roomNum,
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
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(meetings);
            }}
        >
            <AlertBar
                finePrint="You can later update meetings individually"
                type="info"
            >
                Choose time and days
            </AlertBar>

            <TimeRangePicker value={timeRange} onChange={setTimeRange} />

            <Input
                label="Room number (for in person classes)"
                id="roomNum"
                onChange={(e) => setRoomNum(e.target.value)}
                value={roomNum}
                type="text"
            />

            <MultiDatePicker
                onChange={handleDatesUpdate}
                sortOrder="ascending"
            />

            {meetings.map((meeting) => (
                <MeetingInput
                    meeting={meeting}
                    onChange={handleMeetingChange}
                    key={meeting.dateKey}
                />
            ))}

            <pre>{JSON.stringify(meetings, null, 2)}</pre>

            <button type="submit">SUBMIT</button>
        </form>
    );
};

export default MeetingsForm;

import MultiDatePicker from "../ui/MultiDatePicker";
import AlertBar from "../ui/AlertBar";
import MeetingInput from "../ui/MeetingInput";
import TimeRangePicker from "../ui/TimeRangePicker";
import Input from "../ui/Input";
import moment from "moment";
import { useState, useEffect, FormEvent } from "react";
import {
    getTimeStringValues,
    clone,
    configureDateByTimeString,
} from "../../utils/helpers";
import {
    IMeetingOriginal,
    EMeetingTypes,
    ITimeStringRange,
    IMeetingInput,
} from "../../utils/types";

interface Props {
    defaultMeetingType: EMeetingTypes;
    initialMeetingInputs?: IMeetingInput[];
    onChange?: (meetings: IMeetingOriginal[]) => any;
    onSubmit?: (meetings: IMeetingOriginal[]) => any;
}

const MeetingsForm: React.FC<Props> = ({
    onChange,
    onSubmit,
    defaultMeetingType,
    initialMeetingInputs,
}) => {
    const [meetings, setMeetings] = useState<IMeetingInput[]>(
        initialMeetingInputs
    );
    const [timeRange, setTimeRange] = useState<ITimeStringRange>({
        start: "03:00",
        end: "04:00",
    });
    const [roomNum, setRoomNum] = useState<string>();

    useEffect(() => onChange && meetings && onChange(meetings), [meetings]);

    function constructDefaultMeeting(
        date: moment.Moment
    ): IMeetingOriginal & { dateKey: string } {
        const start = new Date(
            configureDateByTimeString(date.toDate(), timeRange.start)
        );
        const end = new Date(
            configureDateByTimeString(date.toDate(), timeRange.end)
        );

        return {
            start,
            end,
            dateKey: start.toString(),
            roomNum: roomNum,
            message: "",
            type: defaultMeetingType,
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

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newMeetings = clone(meetings);

        newMeetings.forEach(function (meeting) {
            delete meeting.dateKey;
        });

        onSubmit(newMeetings);
    }

    // console.log(meetings);

    const initialDates = initialMeetingInputs?.map((meeting) =>
        moment(meeting.start)
    );

    console.log(initialDates);

    return (
        <form onSubmit={handleSubmit}>
            <AlertBar
                finePrint="You can later update meetings individually"
                type="info"
            >
                Choose time and days
            </AlertBar>

            <TimeRangePicker
                value={timeRange}
                onChange={setTimeRange}
                label="Default time range"
            />

            <Input
                label="Room number (for in person classes)"
                onChange={(e) => setRoomNum(e.target.value)}
                value={roomNum}
                id="roomNum"
                type="text"
            />

            <MultiDatePicker
                onChange={handleDatesUpdate}
                sortOrder="ascending"
                initialValue={initialDates}
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

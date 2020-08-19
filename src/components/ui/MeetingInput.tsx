import TimePicker from "./TimePicker";
import TextArea from "./TextArea";
import Input from "./Input";
import Select, { Option } from "./Select";
import { IMeetingOriginal, ECourseTypes } from "../../utils/types";
import { clone, validateMeetingDates } from "../../utils/helpers";
import {
    getTimeStringFromDate,
    configureDateByTimeString,
} from "../../utils/helpers/date.helpers";

interface Props {
    meeting: IMeetingOriginal & { dateKey: string };
    onChange: (meeting: IMeetingOriginal) => any;
    availableCourseTypes?: ECourseTypes[];
}

const MeetingInput: React.FC<Props> = ({
    meeting,
    onChange,
    availableCourseTypes,
}) => {
    availableCourseTypes = availableCourseTypes || Object.values(ECourseTypes);
    const date = new Date(meeting.dateKey);

    function handleChange(e) {
        const newMeeting = clone(meeting);
        Object.assign(newMeeting, { [e.target.id]: e.target.value });
        onChange(newMeeting);
    }

    function handleTimeChange(e) {
        const newMeeting = clone(meeting);
        Object.assign(newMeeting, {
            [e.target.id]: configureDateByTimeString(date, e.target.value),
        });
        onChange(newMeeting);
    }

    return (
        <div>
            <TimePicker
                onChange={handleTimeChange}
                id="start"
                label="Start"
                value={getTimeStringFromDate(meeting.start)}
                validateTime={(timeString: string) =>
                    validateMeetingDates({
                        start: configureDateByTimeString(date, timeString),
                        end: meeting.end,
                    })
                }
            />
            <TimePicker
                onChange={handleTimeChange}
                id="end"
                label="End"
                value={getTimeStringFromDate(meeting.end)}
                validateTime={(timeString: string) =>
                    validateMeetingDates({
                        start: meeting.start,
                        end: configureDateByTimeString(date, timeString),
                    })
                }
            />
            <Select onChange={handleChange} id="type">
                {availableCourseTypes.map((courseType) => (
                    <Option value={courseType} key={courseType}>
                        {courseType}
                    </Option>
                ))}
            </Select>
            <Input
                type="text"
                onChange={handleChange}
                value={meeting.roomNum}
                id="roomNum"
                label="Room"
            />
            <TextArea
                onChange={handleChange}
                id="message"
                value={meeting.message}
                label="Message"
            ></TextArea>
        </div>
    );
};

export default MeetingInput;

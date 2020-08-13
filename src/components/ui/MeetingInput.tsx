import TimePicker from "./TimePicker";
import TextArea from "./TextArea";
import Input from "./Input";
import Select, { Option } from "./Select";
import { IMeetingOriginal, ECourseTypes } from "../../utils/types";
import { clone } from "../../utils/helpers";
import { getTimeStringFromDate } from "../../utils/helpers/date.helpers";

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
    console.log(
        getTimeStringFromDate(meeting.start),
        getTimeStringFromDate(meeting.end)
    );

    return (
        <div>
            <TimePicker
                onChange={handleChange}
                id="start"
                label="Start"
                value={getTimeStringFromDate(meeting.start)}
                date={date}
            />
            <TimePicker
                onChange={handleChange}
                id="end"
                label="End"
                value={getTimeStringFromDate(meeting.end)}
                date={date}
            />
            <Select onChange={handleChange} id="type">
                {availableCourseTypes.map((courseType) => (
                    <Option value={courseType}>{courseType}</Option>
                ))}
            </Select>
            <Input
                type="text"
                onChange={handleChange}
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

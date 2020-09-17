import TextArea from "./TextArea";
import Input from "./Input";
import Select, { Option } from "./Select";
import { IMeetingOriginal, ECourseTypes } from "../../utils/types";
import { clone } from "../../utils/helpers";
import { configureDateByTimeString } from "../../utils/helpers/date.helpers";
import { TimePicker } from "@material-ui/pickers";

interface Props {
    meeting: IMeetingOriginal & { dateKey: string };
    onChange: (meeting: IMeetingOriginal) => any;
    availableMeetingTypes?: ECourseTypes[];
}

const MeetingInput: React.FC<Props> = ({
    meeting,
    onChange,
    availableMeetingTypes,
}) => {
    availableMeetingTypes =
        availableMeetingTypes || Object.values(ECourseTypes);
    const date = new Date(meeting.dateKey);

    function handleChange(e) {
        const newMeeting = clone(meeting);
        Object.assign(newMeeting, { [e.target.id]: e.target.value });
        onChange(newMeeting);
    }

    function handleTimeChange(e) {
        const newMeeting = clone(meeting);
        Object.assign(newMeeting, {
            [e.target.id]: e.target.value,
        });
        onChange(newMeeting);
    }

    return (
        <div>
            <TimePicker
                onChange={handleTimeChange}
                id="start"
                label="Start"
                value={meeting.start}
            />
            <TimePicker
                onChange={handleTimeChange}
                id="end"
                label="End"
                value={meeting.end}
            />
            <Select onChange={handleChange} id="type">
                {availableMeetingTypes.map((courseType) => (
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

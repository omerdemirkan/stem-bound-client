import {
    IMeetingOriginal,
    ECourseTypes,
    EMeetingTypes,
} from "../../utils/types";
import { clone } from "../../utils/helpers";
import { TimePicker } from "@material-ui/pickers";
import {
    Card,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles({
    card: {
        width: "90%",
        maxWidth: "500px",
        padding: "30px",
    },
    halfWidth: {
        width: "50%",
    },
    select: {
        margin: "15px 0 10px",
    },
});

interface Props {
    meeting: IMeetingOriginal & { dateKey: string };
    onChange: (meeting: IMeetingOriginal) => any;
    availableMeetingTypes?: EMeetingTypes[];
}

const MeetingInput: React.FC<Props> = ({
    meeting,
    onChange,
    availableMeetingTypes,
}) => {
    availableMeetingTypes =
        availableMeetingTypes || Object.values(EMeetingTypes);

    const classes = useStyles();

    function handleChange(e) {
        const newMeeting = clone(meeting);
        Object.assign(newMeeting, { [e.target.name]: e.target.value });
        onChange(newMeeting);
    }

    function handleTimeChange(moment: moment.Moment, key: string) {
        const newMeeting = clone(meeting);
        Object.assign(newMeeting, {
            [key]: moment.toDate(),
        });
        onChange(newMeeting);
    }

    return (
        <Card className={classes.card}>
            <Typography variant="h5" align="center">
                {moment(meeting.dateKey)
                    .format("dddd, MMMM Do YYYY")
                    .toString()}
            </Typography>
            <TimePicker
                onChange={(d) => handleTimeChange(d, "start")}
                name="start"
                label="Start"
                value={moment(meeting.start)}
                className={classes.halfWidth}
                margin="normal"
            />
            <TimePicker
                onChange={(d) => handleTimeChange(d, "end")}
                name="end"
                label="End"
                value={moment(meeting.end)}
                className={classes.halfWidth}
                margin="normal"
            />

            <Select
                onChange={handleChange}
                name="type"
                defaultValue={meeting.type}
                fullWidth
                className={classes.select}
            >
                {availableMeetingTypes.map((courseType) => (
                    <MenuItem value={courseType} key={courseType}>
                        {courseType}
                    </MenuItem>
                ))}
            </Select>

            {meeting.type === EMeetingTypes.IN_PERSON ? (
                <TextField
                    onChange={handleChange}
                    value={meeting.roomNum}
                    name="roomNum"
                    label="Room"
                    margin="normal"
                    fullWidth
                />
            ) : (
                <TextField
                    onChange={handleChange}
                    value={meeting.url}
                    name="url"
                    label="Meeting Url"
                    margin="normal"
                    fullWidth
                />
            )}

            <TextField
                onChange={handleChange}
                name="message"
                value={meeting.message}
                label="Message"
                margin="normal"
                fullWidth
                multiline
            />
            <style jsx>{`
                .
            `}</style>
        </Card>
    );
};

export default MeetingInput;

import { IMeetingOriginal, EMeetingTypes } from "../../utils/types";
import { clone } from "../../utils/helpers";
import { TimePicker } from "@material-ui/pickers";
import {
    Card,
    CardProps,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        width: "100%",
        maxWidth: "400px",
        padding: "20px",
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
    CardProps?: CardProps;
}

const MeetingInput: React.FC<Props> = ({
    meeting,
    onChange,
    availableMeetingTypes,
    CardProps,
}) => {
    availableMeetingTypes =
        availableMeetingTypes || Object.values(EMeetingTypes);

    const classes = useStyles();

    function handleChange(e) {
        const newMeeting = clone(meeting);
        Object.assign(newMeeting, { [e.target.name]: e.target.value });
        // if (
        //     e.target.name === "type" &&
        //     e.target.value === EMeetingTypes.IN_PERSON
        // ) {
        //     delete newMeeting.url;
        // } else if (
        //     e.target.name === "type" &&
        //     e.target.value === EMeetingTypes.REMOTE
        // ) {
        //     delete newMeeting.roomNum;
        // }
        onChange(newMeeting);
    }

    function handleTimeChange(date: Date, key: string) {
        const newMeeting = clone(meeting);
        Object.assign(newMeeting, {
            [key]: date,
        });
        onChange(newMeeting);
    }

    return (
        <Card className={classes.card} {...CardProps}>
            <Typography variant="h5" align="center">
                {new Date(meeting.dateKey).toLocaleString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })}
            </Typography>
            <TimePicker
                onChange={(date) => handleTimeChange(date, "start")}
                name="start"
                label="Start"
                value={meeting.start}
                className={classes.halfWidth}
                margin="normal"
            />
            <TimePicker
                onChange={(date) => handleTimeChange(date, "end")}
                name="end"
                label="End"
                value={meeting.end}
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
                    value={meeting.roomNum || ""}
                    name="roomNum"
                    label="Room"
                    margin="normal"
                    fullWidth
                />
            ) : (
                <TextField
                    onChange={handleChange}
                    value={meeting.url || ""}
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

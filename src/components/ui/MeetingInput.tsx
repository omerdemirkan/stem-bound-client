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
import InputButton from "./InputButton";

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

    return (
        <Card className={classes.card} {...CardProps}>
            <InputButton
                onSubmit={onChange}
                initialValue={clone(meeting)}
                renderInput={function (
                    value,
                    setValue,
                    { updateFields, handleChange }
                ) {
                    return (
                        <>
                            <Typography variant="h5" align="center">
                                {new Date(value.dateKey).toLocaleString(
                                    "en-US",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </Typography>
                            <TimePicker
                                onChange={(date) =>
                                    updateFields({ start: date })
                                }
                                name="start"
                                label="Start"
                                value={value.start}
                                className={classes.halfWidth}
                                margin="normal"
                            />
                            <TimePicker
                                onChange={(date) => updateFields({ end: date })}
                                name="end"
                                label="End"
                                value={value.end}
                                className={classes.halfWidth}
                                margin="normal"
                            />

                            <Select
                                onChange={handleChange}
                                name="type"
                                defaultValue={value.type}
                                fullWidth
                                className={classes.select}
                            >
                                {availableMeetingTypes.map((courseType) => (
                                    <MenuItem
                                        value={courseType}
                                        key={courseType}
                                    >
                                        {courseType}
                                    </MenuItem>
                                ))}
                            </Select>

                            {value.type === EMeetingTypes.IN_PERSON ? (
                                <TextField
                                    onChange={handleChange}
                                    value={value.roomNum || ""}
                                    name="roomNum"
                                    label="Room"
                                    margin="normal"
                                    fullWidth
                                />
                            ) : (
                                <TextField
                                    onChange={handleChange}
                                    value={value.url || ""}
                                    name="url"
                                    label="Meeting Url"
                                    margin="normal"
                                    fullWidth
                                />
                            )}

                            <TextField
                                onChange={handleChange}
                                name="message"
                                value={value.message}
                                label="Message"
                                margin="normal"
                                fullWidth
                                multiline
                            />
                        </>
                    );
                }}
            >
                Edit Meeting
            </InputButton>

            <style jsx>{`
                .
            `}</style>
        </Card>
    );
};

export default MeetingInput;

import { IMeetingOriginal, EMeetingTypes } from "../../utils/types";
import { deleteEmptyStrings, getDisplayMeetingType } from "../../utils/helpers";
import { TimePicker } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import { CardProps } from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";
import HidableDiv from "../ui/HidableDiv";

const useStyles = makeStyles({
    card: {
        width: "10000px",
        maxWidth: "100%",
    },
    halfWidth: {
        width: "50%",
    },
    select: {
        margin: "15px 0 10px",
    },
    cardAction: {
        display: "flex",
        justifyContent: "end",
    },
});

export interface IMeetingInputProps {
    onSubmit(meeting: IMeetingOriginal): void;
    availableMeetingTypes?: EMeetingTypes[];
    defaultValues?: Partial<IMeetingOriginal>;
}

const MeetingForm: React.FC<IMeetingInputProps> = ({
    onSubmit,
    availableMeetingTypes,
    defaultValues,
}) => {
    availableMeetingTypes =
        availableMeetingTypes || Object.values(EMeetingTypes);

    const {
        register,
        errors,
        handleSubmit,
        control,
        getValues,
        watch,
    } = useForm({
        defaultValues,
    });

    const classes = useStyles();
    const meetingType = watch("type") || defaultValues?.type;

    return (
        <form
            onSubmit={handleSubmit((values) => {
                deleteEmptyStrings(values);
                onSubmit(values as IMeetingOriginal);
            })}
        >
            <Controller
                control={control}
                name="start"
                render={(params) => (
                    <TimePicker
                        label="Start"
                        className={classes.halfWidth}
                        margin="normal"
                        {...params}
                    />
                )}
            />

            <Controller
                control={control}
                name="end"
                rules={{
                    validate: (value) =>
                        new Date(getValues().start as any) >= new Date(value)
                            ? "Invalid timeframe"
                            : true,
                }}
                render={(params) => (
                    <TimePicker
                        label="End"
                        className={classes.halfWidth}
                        margin="normal"
                        error={!!errors.end}
                        helperText={errors.end?.message}
                        {...params}
                    />
                )}
            />

            <Controller
                control={control}
                name="type"
                render={(params) => (
                    <Select fullWidth className={classes.select} {...params}>
                        {availableMeetingTypes.map((meetingType) => (
                            <MenuItem value={meetingType} key={meetingType}>
                                {getDisplayMeetingType(meetingType)}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />

            <TextField
                inputRef={register({ required: "Required" })}
                name="roomNum"
                label="Room"
                margin="normal"
                fullWidth
                style={
                    meetingType === EMeetingTypes.IN_PERSON
                        ? { display: "none" }
                        : {}
                }
            />
            <TextField
                inputRef={register({ required: "Required" })}
                name="url"
                label="Meeting Url"
                margin="normal"
                fullWidth
                style={
                    meetingType === EMeetingTypes.REMOTE
                        ? { display: "none" }
                        : {}
                }
            />

            <TextField
                inputRef={register}
                name="message"
                label="Message"
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
            </Button>
        </form>
    );
};

export default MeetingForm;

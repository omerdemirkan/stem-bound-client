import { IMeetingOriginal, EMeetingTypes } from "../../utils/types";
import { getDisplayMeetingType } from "../../utils/helpers";
import { TimePicker } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import { CardProps } from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";
import FormCard from "../ui/FormCard";

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
    onSubmit(meeting: Partial<IMeetingOriginal>): void;
    headerText?: string;
    availableMeetingTypes?: EMeetingTypes[];
    CardProps?: CardProps;
    withoutCard?: boolean;
    defaultValues?: Partial<IMeetingOriginal>;
}

const MeetingForm: React.FC<IMeetingInputProps> = ({
    onSubmit,
    availableMeetingTypes,
    CardProps,
    withoutCard,
    defaultValues,
    headerText,
}) => {
    availableMeetingTypes =
        availableMeetingTypes || Object.values(EMeetingTypes);

    const { register, errors, handleSubmit, control, getValues } = useForm({
        defaultValues,
    });

    const classes = useStyles();

    const ModifiedFormCard = withoutCard
        ? ({ children }) => <div>{children}</div>
        : FormCard;

    return (
        <ModifiedFormCard {...CardProps} header={headerText}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                            new Date(getValues().start as any) >=
                            new Date(value)
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
                        <Select
                            fullWidth
                            className={classes.select}
                            {...params}
                        >
                            {availableMeetingTypes.map((meetingType) => (
                                <MenuItem value={meetingType} key={meetingType}>
                                    {getDisplayMeetingType(meetingType)}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />

                {defaultValues.type === EMeetingTypes.IN_PERSON ? (
                    <TextField
                        inputRef={register({ required: "Required" })}
                        name="roomNum"
                        label="Room"
                        margin="normal"
                        fullWidth
                    />
                ) : (
                    <TextField
                        inputRef={register({ required: "Required" })}
                        name="url"
                        label="Meeting Url"
                        margin="normal"
                        fullWidth
                    />
                )}

                <TextField
                    inputRef={register}
                    name="message"
                    label="Message"
                    margin="normal"
                    fullWidth
                    multiline
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Submit
                </Button>
            </form>
        </ModifiedFormCard>
    );
};

export default MeetingForm;

import { IMeetingOriginal, EMeetingTypes } from "../../utils/types";
import { getMeetingTypeDisplay } from "../../utils/helpers";
import { TimePicker } from "@material-ui/pickers";
import {
    Button,
    CardProps,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
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

interface Props {
    onSubmit(meeting: Partial<IMeetingOriginal>): void;
    headerText?: string;
    availableMeetingTypes?: EMeetingTypes[];
    CardProps?: CardProps;
    withoutCard?: boolean;
    defaultValues?: Partial<IMeetingOriginal>;
}

const MeetingInput: React.FC<Props> = ({
    onSubmit,
    availableMeetingTypes,
    CardProps,
    withoutCard,
    defaultValues,
    headerText,
}) => {
    availableMeetingTypes =
        availableMeetingTypes || Object.values(EMeetingTypes);

    const { register, errors, handleSubmit, control } = useForm({
        defaultValues,
    });

    const classes = useStyles();

    const ModifiedFormCard = withoutCard
        ? ({ children }) => <div>{children}</div>
        : FormCard;

    return (
        <ModifiedFormCard {...CardProps}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" align="center">
                    {headerText}
                </Typography>

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
                    render={(params) => (
                        <TimePicker
                            label="End"
                            className={classes.halfWidth}
                            margin="normal"
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
                                    {getMeetingTypeDisplay(meetingType)}
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

export default MeetingInput;

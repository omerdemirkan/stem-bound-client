import {
    Button,
    CardProps,
    Divider,
    makeStyles,
    TextField,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { TimePicker } from "@material-ui/pickers";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IDefaultMeetingData } from "../../utils/types";
import FormCard from "./FormCard";

const useStyles = makeStyles({
    defaultTimePicker: {
        width: "50%",
    },
    nextButton: {
        marginTop: "20px",
    },
    alert: {
        marginBottom: "15px",
    },
});

interface Props {
    requiredFields: string[];
    onSubmit(values: IDefaultMeetingData): any;
    CardProps?: CardProps;
}

const MeetingDefaultDataForm: React.FC<Props> = ({
    requiredFields,
    CardProps,
    onSubmit,
}) => {
    const { register, errors, control, setValue, handleSubmit } = useForm();
    const classes = useStyles();
    useEffect(function () {
        let startTime = new Date();
        let endTime = new Date();

        startTime.setHours(15, 0);
        endTime.setHours(16, 0);

        setValue("start", startTime);
        setValue("end", endTime);
    }, []);
    return (
        <FormCard {...CardProps}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Alert severity="info" className={classes.alert}>
                    <AlertTitle>Choose default times, room and url.</AlertTitle>
                    You can later update meetings individually.
                </Alert>
                <Divider />

                <Controller
                    name="start"
                    defaultValue={new Date()}
                    control={control}
                    render={(params) => (
                        <TimePicker
                            label="Default Start Time"
                            className={classes.defaultTimePicker}
                            margin="normal"
                            {...params}
                        />
                    )}
                />

                <Controller
                    name="end"
                    defaultValue={new Date()}
                    control={control}
                    render={(params) => (
                        <TimePicker
                            label="Default End Time"
                            className={classes.defaultTimePicker}
                            margin="normal"
                            {...params}
                        />
                    )}
                />

                <TextField
                    label="Default Room Number"
                    inputRef={register({
                        required: requiredFields.includes("roomNum")
                            ? "Required"
                            : false,
                    })}
                    name="roomNum"
                    error={errors.roomNum}
                    helperText={
                        errors.roomNum?.message || "For in-person classes"
                    }
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Meeting Url"
                    inputRef={register({
                        required: requiredFields.includes("url")
                            ? "Required"
                            : false,
                    })}
                    name="url"
                    error={errors.url}
                    helperText={errors.url?.message || "For remote classes"}
                    margin="normal"
                    fullWidth
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                >
                    Next
                </Button>
            </form>
        </FormCard>
    );
};

export default MeetingDefaultDataForm;

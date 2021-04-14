import Button from "@material-ui/core/Button";
import { CardProps } from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { TimePicker } from "@material-ui/pickers";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IDefaultMeetingData } from "../../utils/types";
import FormCard from "../ui/FormCard";

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

export interface IMeetingDefaultDataFormProps {
    requiredFields: string[];
    onSubmit(values: IDefaultMeetingData): any;
    CardProps?: CardProps;
    withoutCard?: boolean;
}

const MeetingDefaultDataForm: React.FC<IMeetingDefaultDataFormProps> = ({
    requiredFields,
    CardProps,
    onSubmit,
    withoutCard,
}) => {
    const {
        register,
        errors,
        control,
        setValue,
        handleSubmit,
        getValues,
    } = useForm();
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
                rules={{
                    validate: (value) =>
                        new Date(getValues().start) >= new Date(value)
                            ? "Invalid timeframe"
                            : true,
                }}
                render={(params) => (
                    <TimePicker
                        label="Default End Time"
                        className={classes.defaultTimePicker}
                        margin="normal"
                        helperText={errors.end?.message}
                        error={errors.end}
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
                helperText={errors.roomNum?.message || "For in-person classes"}
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

            <Button variant="contained" color="primary" fullWidth type="submit">
                Next
            </Button>
        </form>
    );
};

export default MeetingDefaultDataForm;

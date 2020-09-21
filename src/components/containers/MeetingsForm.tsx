import MultipleDatesPicker from "@randex/material-ui-multiple-dates-picker";
import MeetingInput from "../ui/MeetingInput";
import FormCard from "../ui/FormCard";
import { useState, useEffect, FormEvent } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { TimePicker } from "@material-ui/pickers";
import { clone } from "../../utils/helpers";
import {
    IMeetingOriginal,
    EMeetingTypes,
    IMeetingInput,
} from "../../utils/types";
import {
    Button,
    Divider,
    Grid,
    makeStyles,
    Step,
    StepLabel,
    Stepper,
    TextField,
} from "@material-ui/core";

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
    stepper: {
        marginBottom: "20px",
    },
});

interface Props {
    defaultMeetingType: EMeetingTypes;
    initialMeetingInputs?: IMeetingInput[];
    onChange?: (meetings: IMeetingOriginal[]) => any;
    onSubmit?: (meetings: IMeetingOriginal[]) => any;
}

const MeetingsForm: React.FC<Props> = ({
    onChange,
    onSubmit,
    defaultMeetingType,
    initialMeetingInputs,
}) => {
    const [meetings, setMeetings] = useState<IMeetingInput[]>(
        initialMeetingInputs || []
    );
    const [defaultMeetingStart, setDefaultMeetingStart] = useState<Date>();
    const [defaultMeetingEnd, setDefaultMeetingEnd] = useState<Date>();
    const [step, setStep] = useState<number>(0);
    const [defaultRoomNum, setDefaultRoomNum] = useState<string>();
    const [defaultUrl, setDefaultUrl] = useState<string>();
    const [dates, setDates] = useState<Date[]>([]);

    useEffect(() => onChange && meetings && onChange(meetings), [meetings]);

    useEffect(function () {
        let date;
        let startTime = new Date();
        let endTime = new Date();

        startTime.setHours(15, 0);
        endTime.setHours(16, 0);

        setDefaultMeetingStart(startTime);
        setDefaultMeetingEnd(endTime);

        const now = new Date();

        const initialDates: Date[] = initialMeetingInputs
            ?.filter((meeting) => new Date(meeting.start) > now)
            .map(function (meeting) {
                date = new Date(meeting.start);
                date.setHours(0, 0);
                return date;
            });

        setDates(initialDates || []);
    }, []);

    const classes = useStyles();

    function constructDefaultMeetingByDate(date: Date): IMeetingInput {
        const dateKey = date.toString();
        let start = new Date(dateKey);
        let end = new Date(dateKey);

        start.setHours(
            defaultMeetingStart.getHours(),
            defaultMeetingStart.getMinutes()
        );
        end.setHours(
            defaultMeetingEnd.getHours(),
            defaultMeetingEnd.getMinutes()
        );

        return {
            start,
            end,
            dateKey,
            message: "",
            type: defaultMeetingType,
            url: defaultUrl,
            roomNum: defaultRoomNum,
        };
    }

    function handleDatesSelected(dates: Date[]) {
        setDates(dates);

        let meetings = [];
        dates.forEach(function (date) {
            meetings.push(constructDefaultMeetingByDate(date));
        });
        setMeetings(meetings);
        setStep(2);
    }

    function handleMeetingChanged(newMeeting: IMeetingInput) {
        setMeetings((prev) => {
            const newMeetings = [...prev];
            newMeetings[
                newMeetings.findIndex(
                    (meeting) => meeting.dateKey === newMeeting.dateKey
                )
            ] = newMeeting;
            return newMeetings;
        });
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newMeetings = clone(meetings);

        newMeetings.forEach(function (meeting) {
            delete meeting.dateKey;
        });

        onSubmit(newMeetings);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stepper activeStep={step} className={classes.stepper}>
                <Step>
                    <StepLabel>Set meeting defaults</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Set meeting dates</StepLabel>
                </Step>
                <Step>
                    <StepLabel optional>Edit meetings</StepLabel>
                </Step>
            </Stepper>

            <FormCard style={step === 0 ? null : { display: "none" }}>
                <Alert severity="info" className={classes.alert}>
                    <AlertTitle>Choose default times, room and url.</AlertTitle>
                    You can later update meetings individually.
                </Alert>
                <Divider />
                <TimePicker
                    value={defaultMeetingStart}
                    onChange={setDefaultMeetingStart}
                    label="Default Start Time"
                    className={classes.defaultTimePicker}
                    margin="normal"
                />
                <TimePicker
                    value={defaultMeetingEnd}
                    onChange={setDefaultMeetingEnd}
                    label="Default End Time"
                    className={classes.defaultTimePicker}
                    margin="normal"
                />

                <TextField
                    label="Default Room Number"
                    onChange={(e) => setDefaultRoomNum(e.target.value)}
                    value={defaultRoomNum || ""}
                    id="roomNum"
                    helperText="For in-person classes"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Meeting Url"
                    onChange={(e) => setDefaultUrl(e.target.value)}
                    value={defaultUrl || ""}
                    id="url"
                    helperText="For remote classes"
                    margin="normal"
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setStep(1)}
                >
                    Next
                </Button>
            </FormCard>

            <MultipleDatesPicker
                open={step === 1}
                selectedDates={dates}
                onCancel={() => setStep(0)}
                onSubmit={handleDatesSelected}
            />

            {step === 2 ? (
                <Grid container spacing={3} justify="space-evenly">
                    {meetings.map((meeting) => (
                        <Grid item wrap="wrap">
                            <MeetingInput
                                meeting={meeting}
                                onChange={handleMeetingChanged}
                                key={meeting.dateKey}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : null}

            <pre>{JSON.stringify(meetings, null, 2)}</pre>

            <button type="submit">SUBMIT</button>
        </form>
    );
};

export default MeetingsForm;

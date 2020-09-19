import MultiDatePicker from "../ui/MultiDatePicker";
import MeetingInput from "../ui/MeetingInput";
import FormCard from "../ui/FormCard";
import moment from "moment";
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
    makeStyles,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
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

    useEffect(() => onChange && meetings && onChange(meetings), [meetings]);

    useEffect(function () {
        let startTime = new Date();
        let endTime = new Date();

        startTime.setHours(15, 0);
        endTime.setHours(16, 0);

        setDefaultMeetingStart(startTime);
        setDefaultMeetingEnd(endTime);
    }, []);

    const classes = useStyles();

    function constructDefaultMeeting(
        date: Date
    ): IMeetingOriginal & { dateKey: string } {
        const start = new Date(date.toString());
        const end = new Date(date.toString());

        start.setHours(
            defaultMeetingStart.getHours(),
            defaultMeetingStart.getMinutes()
        );
        end.setHours(
            defaultMeetingEnd.getHours(),
            defaultMeetingEnd.getMinutes()
        );

        let defaultMeeting: IMeetingInput = {
            start,
            end,
            dateKey: date.toString(),
            message: "",
            type: defaultMeetingType,
        };

        switch (defaultMeeting.type) {
            case EMeetingTypes.IN_PERSON:
                defaultMeeting.roomNum = defaultRoomNum;
            case EMeetingTypes.REMOTE:
                defaultMeeting.url = defaultUrl;
        }

        return defaultMeeting;
    }

    function handleDatesUpdate(dates: moment.Moment[]) {
        if (dates.length === meetings.length) return;
        const meetingWasRemoved = dates.length < meetings.length;

        if (meetingWasRemoved) {
            const newDateKeysHashTable = {};
            dates.forEach(function (date) {
                newDateKeysHashTable[date.toString()] = true;
            });
            setMeetings((previous) =>
                previous.filter(
                    (meeting) => newDateKeysHashTable[meeting.dateKey]
                )
            );
        } else {
            setMeetings((previousMeetings) => {
                let newMeetings = [];
                const oldDateKeysHashTable = {};

                previousMeetings.forEach(function (meeting) {
                    oldDateKeysHashTable[meeting.dateKey] = meeting;
                });

                dates.forEach((date) =>
                    newMeetings.push(
                        oldDateKeysHashTable[date.toString()] ||
                            constructDefaultMeeting(date.toDate())
                    )
                );

                return newMeetings;
            });
        }
    }

    function handleMeetingChange(
        newMeeting: IMeetingOriginal & { dateKey: string }
    ) {
        setMeetings((prev) => {
            const newMeetings = clone(prev);
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

    const initialDates = initialMeetingInputs?.map((meeting) =>
        moment(meeting.start)
    );

    return (
        <form onSubmit={handleSubmit}>
            <Stepper activeStep={step}>
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

            {step === 0 ? (
                <FormCard>
                    <Alert severity="info" className={classes.alert}>
                        <AlertTitle>
                            Choose default times, room and url.
                        </AlertTitle>
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
                        value={defaultRoomNum}
                        id="roomNum"
                        helperText="For in-person classes"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Meeting Url"
                        onChange={(e) => setDefaultUrl(e.target.value)}
                        value={defaultUrl}
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
            ) : null}

            {step === 1 ? (
                <FormCard>
                    <Typography variant="h5" gutterBottom>
                        Select the course's meeting dates
                    </Typography>
                    <Divider />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <MultiDatePicker
                            onChange={handleDatesUpdate}
                            sortOrder="ascending"
                            initialValue={initialDates}
                        />
                    </div>
                </FormCard>
            ) : null}

            {step === 2
                ? meetings.map((meeting) => (
                      <FormCard>
                          <MeetingInput
                              meeting={meeting}
                              onChange={handleMeetingChange}
                              key={meeting.dateKey}
                          />
                      </FormCard>
                  ))
                : null}

            <pre>{JSON.stringify(meetings, null, 2)}</pre>

            <button type="submit">SUBMIT</button>
        </form>
    );
};

export default MeetingsForm;

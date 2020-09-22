import MultipleDatesPicker from "@randex/material-ui-multiple-dates-picker";
import MeetingInput from "../ui/MeetingInput";
import { useState, useEffect, FormEvent } from "react";
import { clone } from "../../utils/helpers";
import {
    IMeetingOriginal,
    EMeetingTypes,
    IMeetingInput,
    ECourseTypes,
    IDefaultMeetingData,
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
import MeetingDefaultDataForm from "../ui/MeetingDefaultDataForm";

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
    courseType: ECourseTypes;
    initialMeetingInputs?: IMeetingInput[];
    onChange?: (meetings: IMeetingOriginal[]) => any;
    onSubmit?: (meetings: IMeetingOriginal[]) => any;
}

const MeetingsForm: React.FC<Props> = ({
    onChange,
    onSubmit,
    defaultMeetingType,
    initialMeetingInputs,
    courseType,
}) => {
    const [meetings, setMeetings] = useState<IMeetingInput[]>(
        initialMeetingInputs || []
    );
    const [step, setStep] = useState<number>(0);
    const [dates, setDates] = useState<Date[]>([]);
    const [defaultMeetingData, setDefaultMeetingData] = useState<
        IDefaultMeetingData
    >();

    useEffect(() => onChange && meetings && onChange(meetings), [meetings]);

    useEffect(function () {
        let date;
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
            defaultMeetingData.start?.getHours(),
            defaultMeetingData.start?.getMinutes()
        );
        end.setHours(
            defaultMeetingData.end?.getHours(),
            defaultMeetingData.end?.getMinutes()
        );

        return {
            start,
            end,
            dateKey,
            message: "",
            type: defaultMeetingType,
            url: defaultMeetingData.url,
            roomNum: defaultMeetingData.roomNum,
        };
    }

    function handleDefaultDataSelected(defaultData: IDefaultMeetingData) {
        setDefaultMeetingData(defaultData);
        setStep(1);
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

    function handleSubmit() {
        const newMeetings = clone(meetings);
        newMeetings.forEach(function (meeting) {
            delete meeting.dateKey;
        });
        onSubmit(newMeetings);
    }

    return (
        <div>
            <Stepper activeStep={step} className={classes.stepper}>
                <Step>
                    <StepLabel>Set meeting defaults</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Set meeting dates</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Edit meetings</StepLabel>
                </Step>
            </Stepper>

            {step < 2 ? (
                <MeetingDefaultDataForm
                    onSubmit={handleDefaultDataSelected}
                    requiredFields={["roomNum", "url"]}
                />
            ) : null}

            <MultipleDatesPicker
                open={step === 1}
                selectedDates={dates}
                onCancel={() => setStep(0)}
                onSubmit={handleDatesSelected}
            />

            {step === 2 ? (
                <>
                    <Grid container spacing={3} justify="space-evenly">
                        {meetings.map((meeting) => (
                            <Grid item wrap="wrap" md={6} lg={4}>
                                <MeetingInput
                                    meeting={meeting}
                                    onChange={handleMeetingChanged}
                                    key={meeting.dateKey}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <button onClick={handleSubmit}>SUBMIT</button>
                </>
            ) : null}
        </div>
    );
};

export default MeetingsForm;

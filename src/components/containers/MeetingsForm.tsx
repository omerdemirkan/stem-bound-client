import MeetingInput from "../util/MeetingInput";
import { useState, useEffect, useContext } from "react";
import { clone, mapMeetingData } from "../../utils/helpers";
import {
    IMeetingOriginal,
    EMeetingTypes,
    IMeeting,
    ECourseTypes,
    IDefaultMeetingData,
} from "../../utils/types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import MeetingDefaultDataForm from "../forms/MeetingDefaultDataForm";
import NotificationContext from "../contexts/NotificationContext";
import Section from "../ui/Section";
import MultipleDatePicker from "../util/MultipleDatePicker";

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

export interface IMeetingsFormProps {
    defaultMeetingType: EMeetingTypes;
    courseType: ECourseTypes;
    courseTitle: string;
    schoolName: string;
    initialMeetingInputs?: IMeeting[];
    onChange?(meetings: IMeetingOriginal[]): any;
    onSubmit?(meetings: IMeetingOriginal[]): any;
    filterDates?(dates: Date[]): Date[];
}

const MeetingsForm: React.FC<IMeetingsFormProps> = ({
    onChange,
    onSubmit,
    defaultMeetingType,
    initialMeetingInputs,
    courseType,
    courseTitle,
    schoolName,
    filterDates,
}) => {
    const [meetings, setMeetings] = useState<IMeeting[]>(
        initialMeetingInputs || []
    );
    const [step, setStep] = useState<number>(0);
    const [dates, setDates] = useState<Date[]>([]);
    const [
        defaultMeetingData,
        setDefaultMeetingData,
    ] = useState<IDefaultMeetingData>();

    const { createSnackbar } = useContext(NotificationContext);

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

    function constructDefaultMeetingByDate(date: Date): IMeeting {
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

        // @ts-ignore
        return mapMeetingData({
            start,
            end,
            // @ts-ignore
            dateKey,
            message: "",
            type: defaultMeetingType,
            url: defaultMeetingData.url,
            roomNum: defaultMeetingData.roomNum,
        });
    }

    function handleDefaultDataSelected(defaultData: IDefaultMeetingData) {
        setDefaultMeetingData(defaultData);
        setStep(1);
    }

    function handleDatesSelected(dates: Date[]) {
        const filteredDates = filterDates ? filterDates(dates) : dates;
        if (!filteredDates.length)
            return createSnackbar({
                text: "All selected meetings have conflicts",
                type: "error",
            });

        const numRemoved = dates.length - filteredDates.length;
        if (numRemoved)
            createSnackbar({
                text: `${numRemoved} meeting date${numRemoved > 1 ? "s" : ""} ${
                    numRemoved > 1 ? "were" : "was"
                } removed due to conflict`,
                type: "info",
            });

        if (filteredDates.length) {
            setDates(filteredDates);
            let meetings = [];
            filteredDates.forEach(function (date) {
                meetings.push(constructDefaultMeetingByDate(date));
            });
            setMeetings(meetings);
            setStep(2);
        }
    }

    function handleMeetingChanged(newMeeting: IMeeting) {
        setMeetings((prev) => {
            const newMeetings = clone(prev);
            const updatedMeetingIndex = newMeetings.findIndex(
                (meeting) => meeting.dateKey === newMeeting.dateKey
            );
            newMeetings[updatedMeetingIndex] = mapMeetingData(newMeeting);
            return newMeetings;
        });
    }

    function handleDeleteMeeting(dateKey: string) {
        setMeetings((prev) =>
            prev.filter((meeting) => meeting.dateKey !== dateKey)
        );
    }

    function handleSubmit() {
        const newMeetings = clone(meetings);
        newMeetings.forEach(function (meeting) {
            delete meeting.dateKey;
        });
        onSubmit(newMeetings);
    }

    return (
        <>
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
                {step === 2 ? (
                    <Step>
                        <StepLabel>
                            <Button
                                onClick={handleSubmit}
                                variant="contained"
                                color="primary"
                            >
                                SUBMIT
                            </Button>
                        </StepLabel>
                    </Step>
                ) : null}
            </Stepper>

            <Section noDivider>
                {step < 2 ? (
                    <MeetingDefaultDataForm
                        onSubmit={handleDefaultDataSelected}
                        requiredFields={["roomNum", "url"]}
                    />
                ) : null}

                <MultipleDatePicker
                    open={step === 1}
                    selectedDates={dates}
                    onCancel={() => setStep(0)}
                    onSubmit={handleDatesSelected}
                />

                {step === 2 &&
                    meetings.map((meeting) => (
                        <MeetingInput
                            meeting={meeting}
                            onChange={handleMeetingChanged}
                            onDelete={handleDeleteMeeting}
                            key={meeting.dateKey}
                            courseTitle={courseTitle}
                            schoolName={schoolName}
                        />
                    ))}
            </Section>
        </>
    );
};

export default MeetingsForm;

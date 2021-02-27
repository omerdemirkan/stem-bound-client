import { TimePicker } from "@material-ui/pickers/TimePicker";

export interface ITimeFrame {
    start: Date;
    end: Date;
}

export interface ITimeFramePickerProps {
    value: ITimeFrame;
    onChange(timeFrame: ITimeFrame): any;
}

const TimeFramePicker: React.FC<ITimeFramePickerProps> = ({
    value,
    onChange,
}) => {
    return (
        <>
            <div className="time-frame-picker-root">
                <TimePicker
                    onChange={(date) => onChange({ ...value, start: date })}
                    label="Start"
                    value={value.start}
                    margin="normal"
                />
                <TimePicker
                    onChange={(date) => onChange({ ...value, end: date })}
                    label="End"
                    value={value.end}
                    margin="normal"
                />
            </div>
            <style jsx>{`
                .time-frame-picker-root {
                    display: grid;
                    grid-template-columns: 50% auto;
                }
            `}</style>
        </>
    );
};

export default TimeFramePicker;

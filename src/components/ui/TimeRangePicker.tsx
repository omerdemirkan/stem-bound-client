import { TimePicker } from "@material-ui/pickers";
import { validateTimeRange } from "../../utils/helpers";
import { ITimeRange } from "../../utils/types";

export interface ITimeRangePickerProps {
    onChange: (timeStringRange: ITimeRange) => any;
    value: ITimeRange;
    label?: string;
}

const TimeRangePicker: React.FC<ITimeRangePickerProps> = ({
    value,
    onChange,
    label,
}) => {
    return (
        <div>
            <label>{label}</label>
            <TimePicker
                onChange={function (date) {
                    const timeRange = { start: date, end: value.end };
                    if (validateTimeRange(timeRange)) onChange(timeRange);
                }}
                name="start"
                value={value.start}
            />
            <TimePicker
                onChange={function (date) {
                    const timeRange = { start: value.start, end: date };
                    if (validateTimeRange(timeRange)) onChange(timeRange);
                }}
                name="end"
                value={value.end}
            />
        </div>
    );
};

export default TimeRangePicker;

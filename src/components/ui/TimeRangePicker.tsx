import TimePicker from "./TimePicker";
import { validateTimeStringRange } from "../../utils/helpers";
import { ITimeStringRange } from "../../utils/types";

interface Props {
    onChange: (timeStringRange: ITimeStringRange) => any;
    value: ITimeStringRange;
}

const TimeRangePicker: React.FC<Props> = ({ value, onChange }) => {
    return (
        <div>
            <TimePicker
                onChange={function (e) {
                    const timeRange = { start: e.target.value, end: value[1] };
                    if (validateTimeStringRange(timeRange)) onChange(timeRange);
                }}
                name="start"
                value={value[0]}
            />
            <TimePicker
                onChange={function (e) {
                    const timeRange = { start: value[0], end: e.target.value };
                    if (validateTimeStringRange(timeRange)) onChange(timeRange);
                }}
                name="end"
                value={value[1]}
            />
        </div>
    );
};

export default TimeRangePicker;

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
                    const timeRange = { start: e.target.value, end: value.end };
                    if (validateTimeStringRange(timeRange)) onChange(timeRange);
                }}
                name="start"
                value={value.start}
            />
            <TimePicker
                onChange={function (e) {
                    const timeRange = {
                        start: value.start,
                        end: e.target.value,
                    };
                    if (validateTimeStringRange(timeRange)) onChange(timeRange);
                }}
                name="end"
                value={value.end}
            />
        </div>
    );
};

export default TimeRangePicker;

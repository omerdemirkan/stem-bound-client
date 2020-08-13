import { useState, ChangeEvent } from "react";
import { getDateAppendedToTimeString } from "../../utils/helpers/date.helpers";

interface Props {
    onChange: (event: ChangeEvent<HTMLInputElement>) => any;
    id?: string;
    date?: Date;
    value?: string;
    label?: string;
    validateTime?: (time: string) => boolean;
}

const TimePicker: React.FC<Props> = ({
    onChange,
    validateTime,
    label,
    value,
    id,
    date,
}) => {
    const [time, setTime] = useState<any>();
    value = value || time;

    function handleTimeChange(e: ChangeEvent<HTMLInputElement>) {
        const timeString = e.target.value;
        if (!validateTime || validateTime(timeString)) {
            setTime(e.target.value);

            if (date) {
                e.target.value = getDateAppendedToTimeString(
                    date,
                    e.target.value
                ) as any;
            }
            onChange(e);
        }
    }
    return (
        <div>
            {label ? <label>{label}</label> : null}
            <input
                type="time"
                onChange={handleTimeChange}
                value={value}
                id={id}
            />
        </div>
    );
};

export default TimePicker;

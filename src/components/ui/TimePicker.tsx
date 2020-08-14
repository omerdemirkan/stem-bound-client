import { useState, ChangeEvent } from "react";

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

import { useState, ChangeEvent } from "react";

interface Props {
    onChange: (time: string) => any;
    label?: string;
    validateTime?: (time: string) => boolean;
}

const TimePicker: React.FC<Props> = ({ onChange, validateTime, label }) => {
    const [time, setTime] = useState<any>();

    function handleTimeChange(e: ChangeEvent<HTMLInputElement>) {
        const timeString = e.target.value;
        if (!validateTime || validateTime(timeString)) {
            setTime(e.target.value);
            onChange(e.target.value);
        }
    }
    return (
        <div>
            {label ? <label>{label}</label> : null}
            <input type="time" onChange={handleTimeChange} value={time} />
        </div>
    );
};

export default TimePicker;

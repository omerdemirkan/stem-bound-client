import { useState, ChangeEvent } from "react";

interface Props {
    onChange: (time: string) => any;
    validateTime?: (time: string) => boolean;
}

const TimePicker: React.FC<Props> = ({ onChange, validateTime }) => {
    const [time, setTime] = useState<any>();

    function handleTimeChange(e: ChangeEvent<HTMLInputElement>) {
        const timeString = e.target.value;
        if (!validateTime || validateTime(timeString)) {
            setTime(e.target.value);
            onChange(e.target.value);
        }
    }
    return <input type="time" onChange={handleTimeChange} value={time} />;
};

export default TimePicker;

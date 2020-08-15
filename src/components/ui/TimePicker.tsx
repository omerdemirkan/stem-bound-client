import { ChangeEvent } from "react";

interface Props {
    onChange: (event: ChangeEvent<HTMLInputElement>) => any;
    value: string;
    id?: string;
    label?: string;
    validateTime?: (time: string) => boolean;
}

const TimePicker: React.FC<Props> = ({
    onChange,
    validateTime,
    label,
    value,
    id,
}) => {
    function handleTimeChange(e: ChangeEvent<HTMLInputElement>) {
        const timeString = e.target.value;
        if (!validateTime || validateTime(timeString)) {
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

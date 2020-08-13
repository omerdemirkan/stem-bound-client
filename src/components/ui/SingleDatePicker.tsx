import { SingleDatePicker as DatePicker } from "react-dates";
import { useState, useEffect } from "react";

interface Props {
    id: string;
    onChange: (date: moment.Moment) => any;
    placeholder?: string;
    focusOnMount?: boolean;
}

const SingleDatePicker: React.FC<Props> = ({
    id,
    focusOnMount,
    placeholder,
    onChange,
}) => {
    const [date, setDate] = useState<moment.Moment>();
    const [focused, setFocused] = useState<boolean>(!!focusOnMount);

    useEffect(() => onChange(date), [date]);

    return (
        <DatePicker
            date={date}
            onDateChange={setDate}
            focused={focused}
            onFocusChange={() => setFocused((prev) => !prev)}
            id={id}
            placeholder={placeholder || "Date"}
        />
    );
};

export default SingleDatePicker;

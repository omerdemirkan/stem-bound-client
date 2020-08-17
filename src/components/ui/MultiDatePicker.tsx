import { useState, useEffect } from "react";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/initialize";

interface Props {
    onChange?: (dates: moment.Moment[]) => any;
    onDateSelected?: (date: moment.Moment) => any;
    onDateRemoved?: (date: moment.Moment) => any;
    sortOrder?: "ascending" | "descending";
}

const MultiDatePicker: React.FC<Props> = ({
    onChange,
    sortOrder,
    onDateRemoved,
    onDateSelected,
}) => {
    const [dates, setDates] = useState<moment.Moment[]>([]);
    const [focused, setFocused] = useState<boolean>(false);

    const isDescendingOrder = sortOrder === "descending";

    function handleDateChange(date: moment.Moment) {
        const wasPreviouslyPicked = dates.some((d) => d.isSame(date));
        if (wasPreviouslyPicked) {
            onDateRemoved && onDateRemoved(date);
            setDates((previousDates) =>
                previousDates.filter((d) => !d.isSame(date))
            );
        } else {
            onDateSelected && onDateSelected(date);
            setDates((previousDates) =>
                [...previousDates, date].sort((a, b) =>
                    b.isAfter(a) === isDescendingOrder ? 1 : -1
                )
            );
        }
    }

    useEffect(() => onChange(dates), [dates]);

    return (
        <DayPickerSingleDateController
            onDateChange={handleDateChange}
            focused={focused}
            onFocusChange={() => setFocused((prev) => !prev)}
            date={null}
            isDayHighlighted={(day) => dates.some((d) => d.isSame(day, "day"))}
            keepOpenOnDateSelect
        />
    );
};
export default MultiDatePicker;

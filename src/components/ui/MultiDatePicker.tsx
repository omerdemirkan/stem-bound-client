import React from "react";
import { DayPickerSingleDateController, CalendarDay } from "react-dates";

interface Props {
    dates: Date[];
    onChange: (...args) => any;
}

export class MultiDatePicker extends React.Component<Props> {
    static defaultProps = {
        dates: [],
    };
    state = {
        dates: this.props.dates,
    };

    handleChange(date) {
        const { dates } = this.state;

        const newDates = dates.includes(date)
            ? dates.filter((d) => !date.isSame(d))
            : [...dates, date];

        this.setState({ dates: newDates });
        this.props.onChange && this.props.onChange(newDates);
    }

    render() {
        return (
            <DayPickerSingleDateController
                numberOfMonths={1}
                onDateChange={this.handleChange}
                renderCalendarDay={(props) => {
                    const { day, modifiers } = props;

                    if (this.state.dates.includes(day)) {
                        modifiers && modifiers.add("selected");
                    } else {
                        modifiers && modifiers.delete("selected");
                    }

                    return <CalendarDay {...props} modifiers={modifiers} />;
                }}
            />
        );
    }
}

export default MultiDatePicker;

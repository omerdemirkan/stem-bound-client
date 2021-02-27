import MultipleDatesPicker from "@randex/material-ui-multiple-dates-picker";

export interface IMultipleDatePickerProps {
    open: boolean;
    selectedDates: Date[];
    onSubmit(dates: Date[]): any;
    onCancel?(): any;
}

const MultipleDatePicker: React.FC<IMultipleDatePickerProps> = ({
    ...multipleDatePickerProps
}) => {
    return <MultipleDatesPicker {...multipleDatePickerProps} />;
};

export default MultipleDatePicker;

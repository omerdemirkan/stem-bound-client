import MultipleDatesPicker from "@randex/material-ui-multiple-dates-picker";

export interface IMultipleDatePickerProps {
    open: boolean;
    selectedDates: Date[];
    onSubmit(dates: Date[]): any;
    onCancel?(): any;
    readOnly?: boolean;
    cancelButtonText?: string;
    submitButtonText?: string;
    selectedDatesTitle?: string;
}

const MultipleDatePicker: React.FC<IMultipleDatePickerProps> = ({
    ...multipleDatePickerProps
}) => {
    return <MultipleDatesPicker {...multipleDatePickerProps} />;
};

export default MultipleDatePicker;

// export interface IMultipleDatePickerPropsNew {
//     open: boolean;
//     value: Date[];
//     onChange(newDates: Date[]): any;
//     validateDay?(day: Date): boolean;
// }

// export const MultipleDatePickerNew: React.FC<IMultipleDatePickerProps> = ({
//     ...multipleDatePickerProps
// }) => {
//     return <Calendar shouldDisableDate={day => !validateDay(day)} />;
// };

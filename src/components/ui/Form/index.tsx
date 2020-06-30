import classes from "./form.module.css";
import {
    IInputData,
    EInputTypes,
    ISelectInputOption,
} from "../../../utils/types";
import Input from "../Input";
import Select, { Option } from "../Select";
import TextArea from "../TextArea";
import { Formik } from "formik";

interface Props {
    inputs: IInputData[];
    onSubmit: (...args: any) => any;
    initialValues: object;
    submitButtonText?: string;
    isSubmitting?: boolean;
}

const Form: React.FC<Props> = ({
    inputs,
    onSubmit,
    initialValues,
    submitButtonText,
    isSubmitting,
}) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit, handleChange, handleBlur, values }) => (
                <form onSubmit={handleSubmit}>
                    {inputs.map((inputData: IInputData) =>
                        paginateInput({
                            inputData,
                            handleChange,
                            handleBlur,
                            value: values[inputData.id],
                            disabled: isSubmitting,
                        })
                    )}
                    <button type="submit">
                        {submitButtonText || "Submit"}
                    </button>
                </form>
            )}
        </Formik>
    );
};

function paginateInput({
    inputData,
    handleChange,
    value,
    handleBlur,
    disabled,
}) {
    switch (inputData.type) {
        case EInputTypes.select:
            return (
                <Select
                    onChange={handleChange}
                    id={inputData.id}
                    label={inputData.label}
                    key={inputData.id}
                    disabled={disabled}
                >
                    {inputData.options.map((option: ISelectInputOption) => (
                        <Option value={option.value}>{option.display}</Option>
                    ))}
                </Select>
            );
        case EInputTypes.textarea:
            return (
                <TextArea
                    onChange={handleChange}
                    id={inputData.id}
                    key={inputData.id}
                    value={value}
                    onBlur={handleBlur}
                    label={inputData.label}
                    disabled={disabled}
                />
            );
        default:
            return (
                <Input
                    type={inputData.type}
                    id={inputData.id}
                    key={inputData.id}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    hidden={inputData.hidden}
                    label={inputData.label}
                    disabled={disabled}
                />
            );
    }
}

export default Form;

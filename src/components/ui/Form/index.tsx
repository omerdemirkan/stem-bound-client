import classes from "./form.module.css";
import Input from "../Input";
import TextArea from "../TextArea";
import Select, { Option } from "../Select";
import {
    IInputData,
    EInputTypes,
    ISelectInputOption,
} from "../../../utils/types";
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
                    {inputs.map((input: IInputData) =>
                        paginateInput({
                            input,
                            handleChange,
                            handleBlur,
                            value: values[input.id],
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

function paginateInput({ input, handleChange, value, handleBlur, disabled }) {
    switch (input.type) {
        case EInputTypes.select:
            return (
                <Select
                    onChange={handleChange}
                    id={input.id}
                    label={input.label}
                    key={input.id}
                    disabled={disabled}
                >
                    {input.options.map((option: ISelectInputOption) => (
                        <Option value={option.value}>{option.display}</Option>
                    ))}
                </Select>
            );
        case EInputTypes.textarea:
            return (
                <TextArea
                    onChange={handleChange}
                    id={input.id}
                    key={input.id}
                    value={value}
                    onBlur={handleBlur}
                    label={input.label}
                    disabled={disabled}
                />
            );
        default:
            return (
                <Input
                    type={input.type}
                    id={input.id}
                    key={input.id}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    hidden={input.hidden}
                    label={input.label}
                    disabled={disabled}
                />
            );
    }
}

export default Form;

import classes from "./form.module.css";
import {
    IInputData,
    EInputTypes,
    ISelectInputOption,
} from "../../../utils/types";
import Input from "../Input";
import Select, { Option } from "../Select";
import TextArea from "../TextArea";

interface Props {
    inputs: IInputData[];
    handleChange: any;
    values: any;
    handleSubmit?: any;
    handleBlur?: any;
}

const Form: React.FC<Props> = ({
    handleSubmit,
    inputs,
    handleBlur,
    handleChange,
    values,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            {inputs.map((inputData: IInputData) =>
                paginateInput({
                    inputData,
                    handleChange,
                    handleBlur,
                    value: values[inputData.id],
                })
            )}
        </form>
    );
};

function paginateInput({ inputData, handleChange, value, handleBlur }) {
    switch (inputData.type) {
        case EInputTypes.select:
            return (
                <Select onChange={handleChange} id={inputData.id}>
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
                    value={value}
                    onBlur={handleBlur}
                />
            );
        default:
            return (
                <Input
                    type={inputData.type}
                    id={inputData.id}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    hidden={inputData.hidden}
                />
            );
    }
}

export default Form;

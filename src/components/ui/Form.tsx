import Input from "./Input";
import TextArea from "./TextArea";
import Select, { Option } from "./Select";
import SearchSelect from "./SearchSelect";
import { IInputData, EInputTypes, ISelectInputOption } from "../../utils/types";
import { Formik, FieldArray } from "formik";

interface Props {
    onSubmit: (...args: any) => any;
    inputs: IInputData[];
    initialValues: object;
    submitButtonText?: string;
    isSubmitting?: boolean;
    validationSchema?: object;
}

const Form: React.FC<Props> = ({
    inputs,
    onSubmit,
    initialValues,
    submitButtonText,
    isSubmitting,
    validationSchema,
}) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema || undefined}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                isValid,
                errors,
                touched,
            }) => (
                <>
                    <form onSubmit={handleSubmit}>
                        {inputs.map((input: IInputData) => (
                            <PaginatedInput
                                input={input}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values[input.id]}
                                error={errors[input.id]}
                                touched={touched[input.id]}
                                key={input.id}
                            />
                        ))}
                        <button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                        >
                            {submitButtonText || "Submit"}
                        </button>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                        <pre>{JSON.stringify(errors, null, 2)}</pre>
                    </form>
                    <style jsx>{``}</style>
                </>
            )}
        </Formik>
    );
};

function PaginatedInput({
    input,
    handleChange,
    value,
    handleBlur,
    error,
    touched,
}) {
    switch (input.type) {
        case EInputTypes.select:
            return (
                <Select
                    onChange={handleChange}
                    id={input.id}
                    label={input.label}
                    key={input.id}
                    error={error}
                    touched={touched}
                >
                    {input.options.map((option: ISelectInputOption) => (
                        <Option value={option.value} key={option.display}>
                            {option.display}
                        </Option>
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
                    error={error}
                    touched={touched}
                />
            );
        case EInputTypes.textArray:
            return (
                <FieldArray name={input.id}>
                    {(helpers) => (
                        <>
                            {input.label ? <label>{input.label}</label> : null}
                            {value &&
                                value.map((s: string, index: number) => (
                                    <div>
                                        <Input
                                            type="text"
                                            onChange={handleChange}
                                            id={`${input.id}.${index}`}
                                            value={s}
                                            error={error ? error[index] : null}
                                            touched={
                                                touched ? touched[index] : null
                                            }
                                            key={input.id}
                                        />
                                        <button
                                            onClick={() =>
                                                helpers.remove(index)
                                            }
                                        >
                                            -
                                        </button>
                                    </div>
                                ))}
                            <button onClick={() => helpers.push("")}>+</button>
                        </>
                    )}
                </FieldArray>
            );
        case EInputTypes.searchSelect:
            return (
                <SearchSelect
                    delay={input.delay}
                    onChange={handleChange}
                    fetchOptions={input.fetchOptions}
                    id={input.id}
                    initialOptions={input.initialOptions || undefined}
                    label={input.label}
                    error={error}
                    touched={touched}
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
                    error={error}
                    touched={touched}
                />
            );
    }
}

export default Form;

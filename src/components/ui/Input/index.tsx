import classes from "./input.module.css";

interface Props {
    type: "text" | "number";
    onChange: (...args: any) => any;
    onBlur?: (...args: any) => any;
    label?: string;
    id?: string;
    error?: string;
    value?: string | number;
    eventTargetValue?: boolean;
    hidden?: boolean;
    disabled?: boolean;
    touched?: boolean;
}

const Input: React.FC<Props> = ({
    onChange,
    type,
    label,
    id,
    value,
    eventTargetValue,
    onBlur,
    hidden,
    disabled,
    touched,
    error,
}) => {
    return (
        <div>
            {label ? <label>{label}</label> : null}
            <input
                onChange={
                    eventTargetValue
                        ? (e) => onChange(e.target.value)
                        : onChange
                }
                onBlur={onBlur}
                type={hidden ? "password" : type}
                id={id || undefined}
                value={value || undefined}
                disabled={disabled}
            />
            {touched && error ? <span>{error}</span> : null}
        </div>
    );
};

export default Input;

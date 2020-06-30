import classes from "./input.module.css";

interface Props {
    onChange: (...args: any) => any;
    onBlur?: (...args: any) => any;
    type?: "text" | "number";
    label?: string;
    id?: string;
    value?: string | number;
    eventTargetValue?: boolean;
    hidden?: boolean;
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
                type={type || "text"}
                id={id || undefined}
                value={value || undefined}
                hidden={hidden}
            />
        </div>
    );
};

export default Input;

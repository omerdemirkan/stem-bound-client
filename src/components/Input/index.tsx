import classes from "./input.module.css";

interface Props {
    onChange: (...args: any) => any;
    type?: "text" | "email" | "hidden" | "number";
    label?: string;
    id?: string;
    value?: string | number;
    eventTargetValue?: boolean;
}

const Input: React.FC<Props> = ({
    onChange,
    type,
    label,
    id,
    value,
    eventTargetValue,
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
                type={type || "text"}
                id={id || undefined}
                value={value || undefined}
            />
        </div>
    );
};

export default Input;

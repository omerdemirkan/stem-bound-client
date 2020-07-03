import classes from "./select.module.css";

interface SelectProps {
    onChange: (...args: any) => any;
    id?: string;
    label?: string;
    disabled?: boolean;
    touched?: boolean;
    error?: string;
}

interface OptionProps {
    value: any;
}

const Select: React.FC<SelectProps> = ({
    children,
    onChange,
    id,
    label,
    disabled,
    touched,
    error,
}) => {
    return (
        <div>
            {label ? <label>{label}</label> : null}
            <select
                className={classes.root}
                onChange={onChange}
                id={id}
                disabled={disabled}
            >
                {children}
            </select>
            {touched && error ? <span>{error}</span> : null}
        </div>
    );
};

export const Option: React.FC<OptionProps> = ({ children, value }) => {
    return <option value={value}>{children}</option>;
};

export default Select;

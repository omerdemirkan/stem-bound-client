import classes from "./select.module.css";

interface SelectProps {
    onChange: (...args: any) => any;
    id?: string;
    label?: string;
    disabled?: boolean;
    touched?: boolean;
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
        </div>
    );
};

export const Option: React.FC<OptionProps> = ({ children, value }) => {
    return <option value={value}>{children}</option>;
};

export default Select;

import classes from "./select.module.css";

interface SelectProps {
    onChange: (...args: any) => any;
}

interface OptionProps {
    value: any;
}

const Select: React.FC<SelectProps> = ({ children, onChange }) => {
    return (
        <select className={classes.root} onChange={onChange}>
            {children}
        </select>
    );
};

export const Option: React.FC<OptionProps> = ({ children, value }) => {
    return <option value={value}>{children}</option>;
};

export default Select;

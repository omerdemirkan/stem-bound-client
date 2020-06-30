import classes from "./select.module.css";

interface SelectProps {
    onChange: (...args: any) => any;
    id?: string;
}

interface OptionProps {
    value: any;
}

const Select: React.FC<SelectProps> = ({ children, onChange, id }) => {
    return (
        <select className={classes.root} onChange={onChange} id={id}>
            {children}
        </select>
    );
};

export const Option: React.FC<OptionProps> = ({ children, value }) => {
    return <option value={value}>{children}</option>;
};

export default Select;

interface SelectProps {
    onChange: (...args: any) => any;
    id: string;
    label?: string;
    disabled?: boolean;
    touched?: boolean;
    error?: string;
    value?: string;
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
    value,
}) => {
    return (
        <div>
            {label ? <label htmlFor={id}>{label}</label> : null}
            <select
                className="root"
                onChange={onChange}
                id={id}
                disabled={disabled}
                value={value}
            >
                {children}
            </select>
            {touched && error ? <span>{error}</span> : null}
            <style jsx>{``}</style>
        </div>
    );
};

export const Option: React.FC<OptionProps> = ({ children, value }) => {
    return <option value={value}>{children}</option>;
};

export default Select;

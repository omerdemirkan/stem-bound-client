interface Props {
    onChange: (...args: any) => any;
    onBlur?: (...args: any) => any;
    value: string;
    id?: string;
    label?: string;
    disabled?: boolean;
    touched?: boolean;
    error?: string;
}

const TextArea: React.FC<Props> = ({
    onChange,
    id,
    value,
    onBlur,
    label,
    disabled,
    touched,
    error,
}) => {
    return (
        <div>
            {label ? <label>{label}</label> : null}
            <textarea
                onChange={onChange}
                value={value}
                id={id || undefined}
                onBlur={onBlur}
                disabled={disabled}
            ></textarea>
            {touched && error ? <span>{error}</span> : null}
            <style jsx>{``}</style>
        </div>
    );
};

export default TextArea;

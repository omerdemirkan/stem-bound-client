import classes from "./textarea.module.css";

interface Props {
    onChange: (...args: any) => any;
    onBlur?: (...args: any) => any;
    value: string;
    id?: string;
    label?: string;
    disabled?: boolean;
    touched?: boolean;
}

const TextArea: React.FC<Props> = ({
    onChange,
    id,
    value,
    onBlur,
    label,
    disabled,
    touched,
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
        </div>
    );
};

export default TextArea;

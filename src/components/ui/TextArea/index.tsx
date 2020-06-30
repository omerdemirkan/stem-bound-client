import classes from "./textarea.module.css";

interface Props {
    onChange: (...args: any) => any;
    onBlur?: (...args: any) => any;
    value: string;
    id?: string;
    rows?: number;
    cols?: number;
    label?: string;
    disabled?: boolean;
}

const TextArea: React.FC<Props> = ({
    onChange,
    id,
    rows,
    cols,
    value,
    onBlur,
    label,
    disabled,
}) => {
    return (
        <div>
            {label ? <label>{label}</label> : null}
            <textarea
                onChange={onChange}
                value={value}
                cols={cols || 30}
                rows={rows || 10}
                id={id || undefined}
                onBlur={onBlur}
                disabled={disabled}
            ></textarea>
        </div>
    );
};

export default TextArea;

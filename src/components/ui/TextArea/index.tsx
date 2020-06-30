import classes from "./textarea.module.css";

interface Props {
    onChange: (...args: any) => any;
    onBlur?: (...args: any) => any;
    value: string;
    id?: string;
    rows?: number;
    cols?: number;
}

const TextArea: React.FC<Props> = ({
    onChange,
    id,
    rows,
    cols,
    value,
    onBlur,
}) => {
    return (
        <div>
            <textarea
                onChange={onChange}
                value={value}
                cols={cols || 30}
                rows={rows || 10}
                id={id || undefined}
                onBlur={onBlur}
            ></textarea>
        </div>
    );
};

export default TextArea;

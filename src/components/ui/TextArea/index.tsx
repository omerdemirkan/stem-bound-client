import classes from "./textarea.module.css";

interface Props {
    onChange: (text: string) => void;
}

const TextArea: React.FC<Props> = ({ onChange }) => {
    return (
        <div>
            <textarea
                cols={30}
                rows={10}
                onChange={(e) => onChange(e.target.value)}
            ></textarea>
        </div>
    );
};

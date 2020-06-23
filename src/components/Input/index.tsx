import classes from "./input.module.css";

interface Props {
    onChange: (text: string) => void;
    type?: "text" | "email" | "hidden" | "number";
}

const Input: React.FC<Props> = ({ onChange, type }) => {
    return (
        <div>
            <input
                onChange={(e) => onChange(e.target.value)}
                type={type || "text"}
            />
        </div>
    );
};

export default Input;

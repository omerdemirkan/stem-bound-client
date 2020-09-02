import Input from "./Input";
import { clone } from "../../utils/helpers";

interface Props {
    onChange(value: string[]): any;
    id: string;
    value: string[];
}

const TextArrayInput: React.FC<Props> = ({ onChange, value, id }) => {
    return (
        <div>
            {value.map((s, index) => (
                <div key={`${id}[${index}]`}>
                    <Input
                        id={`${id}[${index}]`}
                        type="text"
                        value={s}
                        onChange={function (e) {
                            const newValue = clone(value);
                            newValue[index] = e.target.value;
                            onChange(newValue);
                        }}
                    />
                    <button
                        onClick={() =>
                            onChange(value.filter((val) => val !== s))
                        }
                    >
                        -
                    </button>
                </div>
            ))}
            <button
                onClick={() =>
                    onChange([...value.filter((val) => val !== ""), ""])
                }
            >
                +
            </button>
        </div>
    );
};

export default TextArrayInput;

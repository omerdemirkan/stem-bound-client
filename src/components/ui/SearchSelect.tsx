import useDebounce from "../hooks/useDebounce";
import Input from "./Input";
import Select, { Option } from "./Select";
import { ISelectInputOption } from "../../utils/types";
import { useState, useEffect } from "react";

interface Props {
    delay: number;
    id: string;
    onChange: (...args: any) => any;
    fetchOptions: (s: string) => Promise<ISelectInputOption[]>;
    initialOptions?: ISelectInputOption[];
    label?: string;
    error?: string;
    touched?: boolean;
}

const SearchSelect: React.FC<Props> = ({
    initialOptions,
    delay,
    fetchOptions,
    onChange,
    id,
    label,
    error,
    touched,
}) => {
    const [search, setSearch] = useState<string>("");
    const [options, setOptions] = useState<ISelectInputOption[]>(
        initialOptions || []
    );
    const debouncedText = useDebounce(search, delay || 1000);

    async function updateSearch() {
        const options = await fetchOptions(search);
        setOptions(options);
    }

    useEffect(
        // Empty strings coerce to false
        function () {
            if (debouncedText) {
                updateSearch();
            }
        },
        [debouncedText]
    );
    return (
        <div>
            {label ? <label htmlFor={id + "-text-field"}>{label}</label> : null}
            <Input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                id={id + "-text-field"}
            />
            <Select onChange={onChange} id={id + "-select-field"}>
                <Option value="">Select</Option>
                {options.map((option: ISelectInputOption) => (
                    <Option key={option.value} value={option.value}>
                        {option.display}
                    </Option>
                ))}
            </Select>
            {touched && error ? <span>{error}</span> : null}
            <style jsx>{``}</style>
        </div>
    );
};

export default SearchSelect;

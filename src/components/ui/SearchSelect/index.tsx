import classes from "./search-select.module.css";
import useDebounce from "../../hooks/useDebounce";
import { ISelectInputOption } from "../../../utils/types";
import { useState, useEffect } from "react";
import Select, { Option } from "../Select";
import Input from "../Input";

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
        setOptions(await fetchOptions(search));
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
            {label ? <label>{label}</label> : null}
            <Input type="text" onChange={(e) => setSearch(e.target.value)} />
            <Select onChange={onChange} id={id}>
                {options.map((option: ISelectInputOption) => (
                    <Option value={option.value}>{option.display}</Option>
                ))}
            </Select>
            {touched && error ? <span>{error}</span> : null}
        </div>
    );
};

export default SearchSelect;

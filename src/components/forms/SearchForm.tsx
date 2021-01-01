import { searchFieldInputOptions } from "../../utils/constants";
import { ESearchFields } from "../../utils/types";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

interface Props {
    searchField: ESearchFields;
    onSearchFieldChanged: (searchField: ESearchFields) => any;
    onSearchStringChanged: (searchString: string) => any;
}

const SearchForm: React.FC<Props> = ({
    searchField,
    onSearchFieldChanged,
    onSearchStringChanged,
}) => {
    const [searchString, setSearchString] = useState<string>("");
    const debouncedSearchString = useDebounce(searchString, 500);
    useEffect(
        function () {
            onSearchStringChanged(debouncedSearchString);
        },
        [debouncedSearchString]
    );
    return (
        <div>
            <Select
                value={searchField}
                labelId="Search Fields"
                onChange={(e) =>
                    onSearchFieldChanged(e.target.value as ESearchFields)
                }
            >
                {searchFieldInputOptions.map((option, index) => (
                    <MenuItem
                        value={option.searchField}
                        key={option.searchField}
                    >
                        {option.display}
                    </MenuItem>
                ))}
            </Select>
            <TextField
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                placeholder="Search"
                style={{ marginLeft: "30px" }}
            />
        </div>
    );
};

export default SearchForm;

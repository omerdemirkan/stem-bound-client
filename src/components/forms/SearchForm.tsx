import { searchFieldInputOptions } from "../../utils/constants";
import {
    ESearchFields,
    ISearchQuery,
    IWithUserCoordinatesProps,
} from "../../utils/types";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { useContext, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import AuthContext from "../contexts/AuthContext";
import withUserCoordinates from "../hoc/withUserCoordinates";

export interface ISearchFormProps {
    searchField: ESearchFields;
    onSearchQueryChanged: (query: ISearchQuery) => any;
}

const SearchForm: React.FC<
    ISearchFormProps & Partial<IWithUserCoordinatesProps>
> = ({ searchField, onSearchQueryChanged, coordinates }) => {
    const { user } = useContext(AuthContext);

    const [searchQuery, setSearchQuery] = useState<ISearchQuery>({
        searchField,
        exclude: user ? [user._id] : null,
        coordinates,
    });

    const updateSearchQuery = (updates: Partial<ISearchQuery>) =>
        setSearchQuery((prev) => ({ ...prev, ...updates }));

    const [searchString, setSearchString] = useState<string>("");
    const debouncedSearchString = useDebounce(searchString, 500);

    useEffect(
        function () {
            updateSearchQuery({ text: searchString });
        },
        [debouncedSearchString]
    );

    useEffect(
        function () {
            onSearchQueryChanged(searchQuery);
        },
        [searchQuery]
    );

    return (
        <div>
            <Select
                value={searchField}
                labelId="Search Fields"
                onChange={(e) =>
                    updateSearchQuery({
                        searchField: e.target.value as ESearchFields,
                    })
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

export default withUserCoordinates(SearchForm);

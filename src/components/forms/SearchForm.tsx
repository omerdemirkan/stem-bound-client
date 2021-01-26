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
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    paper: {
        padding: "8px 16px",
    },
});

export interface ISearchFormProps {
    searchField: ESearchFields;
    onSearchQueryChanged: (query: ISearchQuery) => any;
    noPaper?: boolean;
}

const SearchForm: React.FC<
    ISearchFormProps & Partial<IWithUserCoordinatesProps>
> = ({ searchField, onSearchQueryChanged, coordinates, noPaper }) => {
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

    const classes = useStyles();

    const Wrapper = noPaper ? ({ children }) => <div>{children}</div> : Paper;

    return (
        <Wrapper className={classes.paper}>
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
        </Wrapper>
    );
};

export default withUserCoordinates(SearchForm);

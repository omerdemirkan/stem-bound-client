import { searchFieldInputOptions } from "../../utils/constants";
import { ISearchQuery, IWithUserCoordinatesProps } from "../../utils/types";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import withUserCoordinates from "../hoc/withUserCoordinates";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useMediaQuery } from "@material-ui/core";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const useStyles = makeStyles({
    paper: {
        padding: "8px 16px",
    },
});

export interface ISearchQueryInputProps {
    value: ISearchQuery;
    onSearchQueryChanged: (query: ISearchQuery) => any;
    noPaper?: boolean;
    searchTextDebounceMs?: number;
}

const SearchQueryInput: React.FC<
    ISearchQueryInputProps & Partial<IWithUserCoordinatesProps>
> = ({ value, onSearchQueryChanged, noPaper, searchTextDebounceMs }) => {
    const classes = useStyles();
    const [searchText, setSearchText] = useState<string>("");
    const smallScreen = useMediaQuery("(max-width: 900px)");
    const debouncedSearchText = useDebounce(
        searchText,
        searchTextDebounceMs || 800
    );
    const updateSearchQuery = (updates) =>
        onSearchQueryChanged({ ...value, ...updates });

    useEffect(
        function () {
            if (debouncedSearchText !== value.text)
                updateSearchQuery({ text: debouncedSearchText });
        },
        [debouncedSearchText]
    );

    const Wrapper = noPaper ? ({ children }) => <div>{children}</div> : Paper;

    return (
        <Wrapper className={classes.paper}>
            <Select
                labelId="Search Fields"
                value={value.searchField}
                fullWidth={smallScreen}
                onChange={(e) =>
                    // @ts-ignore
                    onSearchQueryChanged({ searchField: e.target.value })
                }
            >
                {searchFieldInputOptions.map((option) => (
                    <MenuItem
                        value={option.searchField}
                        key={option.searchField}
                    >
                        {option.display}
                    </MenuItem>
                ))}
            </Select>
            <TextField
                value={searchText}
                fullWidth={smallScreen}
                margin={smallScreen ? "normal" : undefined}
                onChange={(e) => setSearchText(e.target.value)}
                name="text"
                placeholder="Search"
                aria-label="Search for Instructors, School officials, or Students"
            />
        </Wrapper>
    );
};

export default withUserCoordinates(SearchQueryInput);

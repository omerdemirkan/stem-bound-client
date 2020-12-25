import UserCard, { UserCardProps } from "../ui/UserCard";
import { ESearchFields, ISearchData } from "../../utils/types/search.types";
import { searchFieldInputOptions } from "../../utils/constants";
import { EUserRoles, IUser } from "../../utils/types";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ActionBar from "../ui/ActionBar";
import Typography from "@material-ui/core/Typography";
import { getDisplaySearchField, isSearchField } from "../../utils/helpers";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import Button from "@material-ui/core/Button";

interface SearchProps {
    searchField: ESearchFields;
    searchData: ISearchData[];
    onSearchFieldChanged(searchField: ESearchFields): void;
    onSearchStringChanged?(searchString: string): void;
    UserCardProps?: Partial<UserCardProps>;
    loading?: boolean;
}

const Search: React.FC<SearchProps> = ({
    searchField,
    searchData,
    UserCardProps,
    onSearchFieldChanged,
    onSearchStringChanged,
    loading,
}) => {
    const [searchString, setSearchString] = useState<string>("");

    const debouncedSearchString = useDebounce(searchString, 500);

    useEffect(
        function () {
            onSearchStringChanged &&
                onSearchStringChanged(debouncedSearchString);
        },
        [debouncedSearchString]
    );

    return (
        <div>
            <ActionBar
                startEl={
                    <Typography>
                        {getDisplaySearchField(searchField)}
                    </Typography>
                }
            >
                {isSearchField(searchField) && (
                    <Select
                        value={searchField}
                        labelId="Search Fields"
                        onChange={(e) =>
                            onSearchFieldChanged(
                                e.target.value as ESearchFields
                            )
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
                )}

                {onSearchStringChanged && (
                    <TextField
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        placeholder="Search"
                        style={{ marginLeft: "30px" }}
                    />
                )}
            </ActionBar>
            <PaginatedSearchData
                searchDataArray={searchData || []}
                searchField={searchField}
                UserCardProps={UserCardProps}
            />
        </div>
    );
};

interface PaginatedSearchDataProps {
    searchDataArray: ISearchData[];
    searchField: ESearchFields;
    UserCardProps?: Partial<UserCardProps>;
}

const PaginatedSearchData: React.FC<PaginatedSearchDataProps> = ({
    searchDataArray,
    searchField,
    UserCardProps,
}) => {
    if (!Object.values(EUserRoles).includes(searchField as any)) return null;
    return (
        <Grid container spacing={2}>
            {searchDataArray.map((searchData: IUser) => (
                <Grid item xs={12} lg={6} xl={4} key={searchData._id}>
                    <UserCard
                        user={searchData}
                        key={searchData._id}
                        {...UserCardProps}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default Search;

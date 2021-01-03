import UserCard, { UserCardProps } from "../ui/UserCard";
import {
    ESearchFields,
    ISearchData,
    ISearchQuery,
} from "../../utils/types/search.types";
import { EUserRoles, IUser } from "../../utils/types";
import Grid from "@material-ui/core/Grid";
import ActionBar from "../ui/ActionBar";
import Typography from "@material-ui/core/Typography";
import { getDisplaySearchField, isSearchField } from "../../utils/helpers";
import SearchForm from "../forms/SearchForm";

interface SearchProps {
    searchField: ESearchFields;
    searchData: ISearchData[];
    onSearchQueryChanged(query: ISearchQuery): void;
    UserCardProps?: Partial<UserCardProps>;
    loading?: boolean;
    query?: ISearchQuery;
}

const Search: React.FC<SearchProps> = ({
    searchField,
    searchData,
    UserCardProps,
    onSearchQueryChanged,
    loading,
    query,
}) => {
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
                    <SearchForm
                        searchField={searchField as ESearchFields}
                        onSearchQueryChanged={onSearchQueryChanged}
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

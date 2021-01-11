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
import PictureMessage from "../ui/PictureMessage";
import NoResultsSVG from "../svg/illustrations/no-results";

interface SearchProps {
    query: ISearchQuery;
    searchData: ISearchData[];
    onSearchQueryChanged(query: ISearchQuery): void;
    UserCardProps?: Partial<UserCardProps>;
    loading?: boolean;
}

const Search: React.FC<SearchProps> = ({
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
                        {getDisplaySearchField(query.searchField)}
                    </Typography>
                }
            >
                {isSearchField(query.searchField) && (
                    <SearchForm
                        searchField={query.searchField}
                        onSearchQueryChanged={onSearchQueryChanged}
                    />
                )}
            </ActionBar>
            <PaginatedSearchData
                searchDataArray={searchData || []}
                searchField={query.searchField}
                UserCardProps={UserCardProps}
            />
            {!loading && !searchData?.length && (
                <PictureMessage
                    Svg={NoResultsSVG}
                    size="small"
                    message="No results found"
                />
            )}
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
                <Grid item sm={12} md={6} lg={4} key={searchData._id}>
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

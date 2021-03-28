import UserCard, { IUserCardProps } from "../ui/UserCard";
import {
    ESearchFields,
    ISearchData,
    ISearchQuery,
} from "../../utils/types/search.types";
import { EUserRoles, IUser } from "../../utils/types";
import { getDisplaySearchField, isSearchField } from "../../utils/helpers";
import ActionBar from "../ui/ActionBar";
import Typography from "@material-ui/core/Typography";
import SearchQueryInput from "./SearchQueryInput";
import PictureMessage from "../ui/PictureMessage";
import NoResultsSVG from "../svg/illustrations/no-results";
import Grid from "@material-ui/core/Grid";

export interface ISearchProps {
    query: ISearchQuery;
    searchData: ISearchData[];
    onSearchQueryChanged(query: ISearchQuery): void;
    UserCardProps?: Partial<IUserCardProps>;
    loading?: boolean;
}

const Search: React.FC<ISearchProps> = ({
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
                    <Typography color="textPrimary" variant="h6">
                        {getDisplaySearchField(query.searchField)}
                    </Typography>
                }
            >
                {isSearchField(query.searchField) && (
                    <SearchQueryInput
                        value={query}
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
                    size="sm"
                    message="No results found"
                />
            )}
        </div>
    );
};

interface PaginatedSearchDataProps {
    searchDataArray: ISearchData[];
    searchField: ESearchFields;
    UserCardProps?: Partial<IUserCardProps>;
}

const PaginatedSearchData: React.FC<PaginatedSearchDataProps> = ({
    searchDataArray,
    searchField,
    UserCardProps,
}) => {
    if (!Object.values(EUserRoles).includes(searchField as any)) return null;
    return (
        <Grid container spacing={3}>
            {searchDataArray.map((searchData: IUser) => (
                <Grid item xs={12} md={6} lg={4}>
                    <UserCard
                        key={searchData._id}
                        user={searchData}
                        fullWidth
                        noMargin
                        {...UserCardProps}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default Search;

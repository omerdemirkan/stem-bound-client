import UserCard, { IUserCardProps } from "../ui/UserCard";
import {
    ESearchFields,
    ISearchData,
    ISearchQuery,
} from "../../utils/types/search.types";
import { EUserRoles, IUser } from "../../utils/types";
import ActionBar from "../ui/ActionBar";
import Typography from "@material-ui/core/Typography";
import { getDisplaySearchField, isSearchField } from "../../utils/helpers";
import SearchQueryInput from "./SearchQueryInput";
import PictureMessage from "../ui/PictureMessage";
import NoResultsSVG from "../svg/illustrations/no-results";
import RelativeGrid from "../ui/RelativeGrid";

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
        <RelativeGrid minWidthInPixels={400}>
            {searchDataArray.map((searchData: IUser) => (
                <UserCard
                    key={searchData._id}
                    user={searchData}
                    fullWidth
                    noMargin
                    {...UserCardProps}
                />
            ))}
        </RelativeGrid>
    );
};

export default Search;

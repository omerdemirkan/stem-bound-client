import UserCard, { UserCardProps } from "../ui/UserCard";
import {
    ESearchFields,
    ISearchData,
    ISearchQuery,
} from "../../utils/types/search.types";
import { EUserRoles, IUser } from "../../utils/types";
import ActionBar from "../ui/ActionBar";
import Typography from "@material-ui/core/Typography";
import { getDisplaySearchField, isSearchField } from "../../utils/helpers";
import SearchForm from "../forms/SearchForm";
import PictureMessage from "../ui/PictureMessage";
import NoResultsSVG from "../svg/illustrations/no-results";
import FlexBox from "../ui/FlexBox";

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
        <FlexBox>
            {searchDataArray.map((searchData: IUser) => (
                <UserCard
                    key={searchData._id}
                    user={searchData}
                    {...UserCardProps}
                />
            ))}
        </FlexBox>
    );
};

export default Search;

import Link from "next/link";
import UserCard, { UserCardProps } from "../ui/UserCard";
import { ESearchFields, ISearchData } from "../../utils/types/search.types";
import { searchFieldInputOptions } from "../../utils/constants";
import { appendQueriesToUrl } from "../../utils/helpers";
import { useRouter } from "next/router";
import { EUserRoles, IUser } from "../../utils/types";
import Grid from "@material-ui/core/Grid";

interface SearchProps {
    searchField: ESearchFields;
    searchData: ISearchData[];
    shallow?: boolean;
    UserCardProps?: Partial<UserCardProps>;
}

const Search: React.FC<SearchProps> = ({
    searchField,
    searchData,
    shallow,
    UserCardProps,
}) => {
    const router = useRouter();

    return (
        <div>
            <h3>{searchField}</h3>
            {searchFieldInputOptions.map((option) => (
                <Link
                    href={appendQueriesToUrl(router.pathname, {
                        q: option.searchField,
                    })}
                    shallow={shallow}
                    key={option.searchField}
                >
                    <a>{option.display}</a>
                </Link>
            ))}
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
    if (Object.values(EUserRoles).includes(searchField as any)) {
        return (
            <Grid container spacing={3}>
                {searchDataArray.map((searchData: IUser) => (
                    <Grid item xs={12} lg={6} xl={4}>
                        <UserCard
                            user={searchData}
                            key={searchData._id}
                            {...UserCardProps}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }
    return null;
};

export default Search;

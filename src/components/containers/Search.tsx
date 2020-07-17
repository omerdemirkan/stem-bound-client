import Link from "next/link";
import { ESearchFields, ISearchData } from "../../utils/types/search.types";
import { searchFieldInputOptions } from "../../utils/constants";
import { appendQueriesToUrl } from "../../utils/helpers";
import { useRouter } from "next/router";
import { EUserRoles, IUser } from "../../utils/types";
import UserCard from "../ui/UserCard";

interface SearchProps {
    searchField: ESearchFields;
    searchData: ISearchData[];
    shallow?: boolean;
}

const Search: React.FC<SearchProps> = ({
    searchField,
    searchData,
    shallow,
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
            />
        </div>
    );
};

interface PaginatedSearchDataProps {
    searchDataArray: ISearchData[];
    searchField: ESearchFields;
}

const PaginatedSearchData: React.FC<PaginatedSearchDataProps> = ({
    searchDataArray,
    searchField,
}) => {
    if (Object.values(EUserRoles).includes(searchField as any)) {
        return (
            <>
                {searchDataArray.map((searchData: ISearchData) => (
                    <UserCard user={searchData as IUser} />
                ))}
            </>
        );
    }
    return null;
};

export default Search;

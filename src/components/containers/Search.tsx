import Link from "next/link";
import UserCard from "../ui/UserCard";
import { ESearchFields, ISearchData } from "../../utils/types/search.types";
import { searchFieldInputOptions } from "../../utils/constants";
import { appendQueriesToUrl } from "../../utils/helpers";
import { useRouter } from "next/router";
import { EUserRoles, IUser } from "../../utils/types";

interface SearchProps {
    searchField: ESearchFields;
    searchData: ISearchData[];
    handleSendMessage: (IUser) => any;
    shallow?: boolean;
}

const Search: React.FC<SearchProps> = ({
    searchField,
    searchData,
    shallow,
    handleSendMessage,
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
                handleSendMessage={handleSendMessage}
            />
        </div>
    );
};

interface PaginatedSearchDataProps {
    searchDataArray: ISearchData[];
    searchField: ESearchFields;
    handleSendMessage: (IUser) => any;
}

const PaginatedSearchData: React.FC<PaginatedSearchDataProps> = ({
    searchDataArray,
    searchField,
    handleSendMessage,
}) => {
    if (Object.values(EUserRoles).includes(searchField as any)) {
        return (
            <>
                {searchDataArray.map((searchData: IUser) => (
                    <UserCard
                        user={searchData}
                        key={searchData._id}
                        handleSendMessage={handleSendMessage}
                    />
                ))}
            </>
        );
    }
    return null;
};

export default Search;

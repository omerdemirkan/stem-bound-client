import { ESearchFields, ISearchData } from "../../utils/types/search.types";
import { searchFieldInputOptions } from "../../utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { appendQueriesToUrl } from "../../utils/helpers";

interface Props {
    searchField: ESearchFields;
    searchData: ISearchData[];
    shallow?: boolean;
}

const Search: React.FC<Props> = ({ searchField, searchData, shallow }) => {
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
            <pre>{JSON.stringify(searchData, null, 2)}</pre>
        </div>
    );
};

export default Search;

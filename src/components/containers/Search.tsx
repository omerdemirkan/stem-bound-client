import { ESearchQueries, ISearchData } from "../../utils/types/search.types";
import Select, { Option } from "../ui/Select";
import { searchQueryInputOptions } from "../../utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { appendQueriesToUrl } from "../../utils/helpers";

interface Props {
    query: ESearchQueries;
    searchData: ISearchData[];
    shallow?: boolean;
}

const Search: React.FC<Props> = ({ query, searchData, shallow }) => {
    const router = useRouter();
    return (
        <div>
            <h3>{query}</h3>
            {searchQueryInputOptions.map((option) => (
                <Link
                    href={appendQueriesToUrl(router.pathname, {
                        ...router.query,
                        q: option.query,
                    })}
                    shallow={shallow}
                    key={option.query}
                >
                    <a>{option.display}</a>
                </Link>
            ))}
            <pre>{JSON.stringify(searchData, null, 2)}</pre>
        </div>
    );
};

export default Search;

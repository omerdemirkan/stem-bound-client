import { ESearchQueries, ISearchData } from "../../utils/types/search.types";
import Select, { Option } from "../ui/Select";
import { searchQueryInputOptions } from "../../utils/constants";

interface Props {
    query: ESearchQueries;
    searchData: ISearchData[];
    handleQueryUpdate: (...args) => any;
}

const Search: React.FC<Props> = ({ query, searchData, handleQueryUpdate }) => {
    return (
        <div>
            <h3>{query}</h3>
            <Select onChange={handleQueryUpdate}>
                {searchQueryInputOptions.map((option) => (
                    <Option value={option.value}>{option.display}</Option>
                ))}
            </Select>
            <pre>{JSON.stringify(searchData, null, 2)}</pre>
        </div>
    );
};

export default Search;

import StaticLayout from "../components/ui/StaticLayout";
import Head from "next/head";
import Search from "../components/containers/Search";
import { NextPageContext } from "next";
import { fetchSearchData } from "../utils/services";
import { ESearchFields, ISearchData, ISearchQuery } from "../utils/types";
import {
    serverRedirect,
    isSearchField,
    SearchField,
    deleteUndefined,
    appendQueriesToUrl,
    getDisplaySearchField,
} from "../utils/helpers";
import { useRouter } from "next/router";

interface Props {
    query: ISearchQuery;
    searchData: ISearchData[];
}

const SearchPage: React.FC<Props> = ({ query, searchData }) => {
    const router = useRouter();
    return (
        <StaticLayout>
            <Head>
                <title>
                    {getDisplaySearchField(query.searchField)} - STEM-bound
                </title>
            </Head>
            <h1>Search</h1>
            <Search
                searchData={searchData}
                query={query}
                onSearchQueryChanged={(query) =>
                    router.push(appendQueriesToUrl(router.pathname, query))
                }
            />
            <style jsx>{``}</style>
        </StaticLayout>
    );
};

export async function getServerSideProps(ctx: NextPageContext) {
    try {
        const query = ctx.query as any;
        if (!isSearchField(query.searchField)) throw new Error();
        let searchData = (
            await fetchSearchData(SearchField(query.searchField), query)
        ).data;
        deleteUndefined(searchData);
        const props: Props = { query, searchData };
        return { props };
    } catch (e) {
        return serverRedirect(
            ctx,
            `search?searchField=${ESearchFields.INSTRUCTOR}`
        );
    }
}

export default SearchPage;

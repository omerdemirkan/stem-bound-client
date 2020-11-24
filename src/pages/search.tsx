import Layout from "../components/ui/Layout";
import Head from "next/head";
import Search from "../components/containers/Search";
import { NextPageContext } from "next";
import { fetchSearchData } from "../utils/services";
import { ESearchFields, ISearchData } from "../utils/types";
import {
    serverRedirect,
    isSearchField,
    SearchField,
    deleteUndefined,
} from "../utils/helpers";
import { useRouter } from "next/router";

interface Props {
    searchField: ESearchFields;
    searchData: ISearchData[];
}

const SearchPage: React.FC<Props> = ({ searchField, searchData }) => {
    const router = useRouter();
    function handleSendMessage() {
        console.log("U cant send a message B, you need to be logged in.");
    }
    return (
        <Layout>
            <Head>
                <title>STEM-bound - Search</title>
            </Head>
            <h1>Search</h1>
            <Search
                searchField={searchField}
                searchData={searchData}
                onSearchFieldChanged={(searchField) =>
                    router.push({
                        pathname: router.pathname,
                        query: { q: searchField },
                    })
                }
            />
            <style jsx>{``}</style>
        </Layout>
    );
};

export async function getServerSideProps(ctx: NextPageContext) {
    try {
        const searchField = ctx.query.q;
        if (!isSearchField(searchField)) throw new Error();
        let searchData = (
            await fetchSearchData({
                field: SearchField(searchField),
            })
        ).data;
        deleteUndefined(searchData);
        return { props: { searchField, searchData } };
    } catch (e) {
        return serverRedirect(ctx, `search?q=${ESearchFields.INSTRUCTOR}`);
    }
}

export default SearchPage;

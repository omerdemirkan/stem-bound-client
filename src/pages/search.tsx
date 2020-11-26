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
    appendQueriesToUrl,
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
                    router.push(
                        appendQueriesToUrl(router.pathname, {
                            ...router.query,
                            q: searchField,
                        })
                    )
                }
                onSearchStringChanged={(searchString) =>
                    router.push(
                        appendQueriesToUrl(router.pathname, {
                            ...router.query,
                            text: searchString,
                        })
                    )
                }
            />
            <style jsx>{``}</style>
        </Layout>
    );
};

export async function getServerSideProps(ctx: NextPageContext) {
    try {
        const searchField = ctx.query.q;
        const text = ctx.query.text as string;
        if (!isSearchField(searchField)) throw new Error();
        let searchData = (
            await fetchSearchData({
                field: SearchField(searchField),
                text,
            })
        ).data;
        deleteUndefined(searchData);
        return { props: { searchField, searchData } };
    } catch (e) {
        return serverRedirect(ctx, `search?q=${ESearchFields.INSTRUCTOR}`);
    }
}

export default SearchPage;

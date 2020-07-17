import Layout from "../components/ui/Layout";
import Head from "next/head";
import Search from "../components/containers/Search";
import { NextPageContext } from "next";
import { fetchSearchData } from "../utils/services";
import { ESearchFields, ISearchData } from "../utils/types/search.types";
import { serverRedirect } from "../utils/helpers";

interface Props {
    searchField: ESearchFields;
    searchData: ISearchData[];
}

const SearchPage: React.FC<Props> = ({ searchField, searchData }) => {
    return (
        <Layout>
            <Head>
                <title>Stem-bound - Search</title>
            </Head>
            <h1>Search</h1>
            <Search searchField={searchField} searchData={searchData} />
            <style jsx>{``}</style>
        </Layout>
    );
};

export async function getServerSideProps(ctx: NextPageContext) {
    try {
        const searchField = ctx.query.q;
        let searchData = await fetchSearchData(searchField as any, {});
        return { props: { searchField, searchData } };
    } catch (e) {
        return serverRedirect(ctx, `search?q=${ESearchFields.INSTRUCTOR}`);
    }
}

export default SearchPage;

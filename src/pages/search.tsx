import Layout from "../components/ui/Layout";
import Head from "next/head";
import Search from "../components/containers/Search";
import { NextPageContext } from "next";
import { fetchSearchData } from "../utils/services";
import { ESearchQueries, ISearchData } from "../utils/types/search.types";
import { useRouter } from "next/router";
import { BooleanSchema } from "yup";
import { serverRedirect } from "../utils/helpers";

interface Props {
    query: ESearchQueries;
    searchData: ISearchData[];
    redirect?: BooleanSchema;
}

const SearchPage: React.FC<Props> = ({ query, searchData, redirect }) => {
    const router = useRouter();
    const defaultQuery = ESearchQueries.INSTRUCTOR;

    return (
        <Layout>
            <Head>
                <title>Stem-bound - Search</title>
            </Head>
            <h1>Search</h1>
            <Search query={query} searchData={searchData} />
            <style jsx>{``}</style>
        </Layout>
    );
};

export async function getServerSideProps(ctx: NextPageContext) {
    try {
        const query = ctx.query.q;
        let searchData = await fetchSearchData(query as any);
        return { props: { query, searchData } };
    } catch (e) {
        return serverRedirect(ctx, `search?q=${ESearchQueries.INSTRUCTOR}`);
    }
}

export default SearchPage;

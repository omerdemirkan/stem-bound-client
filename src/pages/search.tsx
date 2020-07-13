import Layout from "../components/ui/Layout";
import Head from "next/head";
import Search from "../components/containers/Search";
import { EUserRoles } from "../utils/types";
import { NextPageContext } from "next";
import { fetchUsers } from "../utils/services";
import { ESearchQueries, ISearchData } from "../utils/types/search.types";
import { useRouter } from "next/router";

interface Props {
    query: ESearchQueries;
    searchData: ISearchData[];
}

const SearchPage: React.FC<Props> = ({ query, searchData }) => {
    const router = useRouter();

    function handleQueryUpdate(e) {
        const query = e.target.value;
        router.push(`/search?q=${query}`);
    }
    return (
        <Layout>
            <Head>
                <title>Stem-bound - Search</title>
            </Head>
            <h1>Search</h1>
            <Search
                query={query}
                searchData={searchData}
                handleQueryUpdate={handleQueryUpdate}
            />
            <style jsx>{``}</style>
        </Layout>
    );
};

export async function getServerSideProps(ctx: NextPageContext) {
    const query = ctx.query.q;
    let searchData;
    if (Object.values(EUserRoles).includes(query as any)) {
        searchData = await fetchUsers({
            role: query as EUserRoles,
        });
    }
    return { props: { query, searchData } };
}

export default SearchPage;

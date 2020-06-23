import Head from "next/head";
import Layout from "../components/Layout";

const Home: React.FC = function () {
    return (
        <Layout>
            <Head>
                <link rel="icon" href="/public/favicon.ico" />
                <title>Stem-bound - Home</title>
            </Head>
            <h1>Home</h1>
        </Layout>
    );
};

export default Home;

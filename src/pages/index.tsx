import Head from "next/head";
import Layout from "../components/ui/Layout";

const Home: React.FC = function () {
    return (
        <Layout>
            <Head>
                <title>Stem-bound - Home</title>
            </Head>
            <h1>Home</h1>
        </Layout>
    );
};

export default Home;

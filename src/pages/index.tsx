import Head from "next/head";
import Layout from "../components/Layout";

const Home: React.FC = function () {
    return (
        <Layout>
            <Head>
                <title>Stem-bound - Home</title>
            </Head>
            <h1>Welcome to stem-bound!</h1>
        </Layout>
    );
};

export default Home;

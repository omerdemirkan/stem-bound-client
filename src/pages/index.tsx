import Head from "next/head";
import Layout from "../components/Layout";

const Home: React.FC = function () {
    return (
        <Layout>
            <Head>
                <link rel="icon" href="/public/favicon.ico" />
                <title>Stem-bound - Home</title>
            </Head>
            <h1>Welcome to stem-bound!</h1>
            <h2>Welcome to stem-bound!</h2>
            <h3>Welcome to stem-bound!</h3>
            <h4>Welcome to stem-bound!</h4>
            <h5>Welcome to stem-bound!</h5>
            <h6>Welcome to stem-bound!</h6>
            <button>volunteer</button>
        </Layout>
    );
};

export default Home;

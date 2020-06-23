import Head from "next/head";
import Layout from "../components/Layout";

const Home: React.FC = function () {
    return (
        <Layout>
            <Head>
                <link rel="icon" href="/public/favicon.ico" />
                <title>Stem-bound - Home</title>
            </Head>
            <h1>h1: Welcome to Stem-bound!</h1>
            <h2>h2: Welcome to Stem-bound!</h2>
            <h3>h3: Welcome to Stem-bound!</h3>
            <h4>h4: Welcome to Stem-bound!</h4>
            <h5>h5: Welcome to Stem-bound!</h5>
            <h6>h6: Welcome to Stem-bound!</h6>
            <p>p: Welcome to Stem-bound!</p>
            <div>
                <button>volunteer</button>
                <button className="lg">volunteer</button>
                <button className="sm">volunteer</button>
            </div>
            <div>
                <button className="primary">volunteer</button>
                <button className="accent">volunteer</button>
                <button className="border">volunteer</button>
            </div>
        </Layout>
    );
};

export default Home;

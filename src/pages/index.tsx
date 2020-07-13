import Head from "next/head";
import Layout from "../components/ui/Layout";

const HomePage: React.FC = function () {
    return (
        <Layout>
            <Head>
                <title>Stem-bound - Home</title>
            </Head>
            <h1>Home</h1>
            <style jsx>{``}</style>
        </Layout>
    );
};

export default HomePage;

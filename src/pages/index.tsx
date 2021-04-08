import Head from "next/head";
import StaticLayout from "../components/layouts/StaticLayout";

const HomePage: React.FC = function () {
    return (
        <StaticLayout>
            <Head>
                <title>Home - STEM-bound</title>
            </Head>
            <h1>Home</h1>
            <style jsx>{``}</style>
        </StaticLayout>
    );
};

export default HomePage;

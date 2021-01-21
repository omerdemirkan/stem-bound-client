import Head from "next/head";
import StaticLayout from "../components/ui/Layout";

const HomePage: React.FC = function () {
    return (
        <StaticLayout>
            <Head>
                <title>STEM-bound - Home</title>
            </Head>
            <h1>Home</h1>
            <style jsx>{``}</style>
        </StaticLayout>
    );
};

export default HomePage;

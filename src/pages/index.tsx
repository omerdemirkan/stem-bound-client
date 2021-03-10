import Head from "next/head";
import StaticLayout from "../components/ui/StaticLayout";
import HomePageIntro from "../components/ui/HomePageIntro";

const HomePage: React.FC = function () {
    return (
        <StaticLayout>
            <Head>
                <title>STEM-bound - Home</title>
            </Head>
            <HomePageIntro />
            <style jsx>{``}</style>
        </StaticLayout>
    );
};

export default HomePage;

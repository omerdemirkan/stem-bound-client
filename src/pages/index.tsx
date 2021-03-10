import Head from "next/head";
import StaticLayout from "../components/ui/StaticLayout";
import HomePageIntro from "../components/ui/HomePageIntro";
import HomePageInfo from "../components/ui/HomePageInfo";

const HomePage: React.FC = function () {
    return (
        <StaticLayout>
            <Head>
                <title>STEM-bound - Home</title>
            </Head>
            <HomePageIntro />
            <HomePageInfo />
            <style jsx>{``}</style>
        </StaticLayout>
    );
};

export default HomePage;

import StaticLayout from "../components/ui/StaticLayout";
import Head from "next/head";

const AboutPage: React.FC = () => {
    return (
        <StaticLayout>
            <Head>
                <title>About Us - STEM-bound</title>
            </Head>
            <h1>About Us</h1>
            <style jsx>{``}</style>
        </StaticLayout>
    );
};

export default AboutPage;

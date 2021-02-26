import Head from "next/head";
import StaticLayout from "../components/ui/StaticLayout";

const HomePage: React.FC = function () {
    return (
        <StaticLayout>
            <Head>
                <title>STEM-bound - Home</title>
            </Head>
            <h1>Home</h1>

            
            <style jsx>{`
                h1 {
                    color:red
                }
                `}</style>
        </StaticLayout>
    );
};

export default HomePage;

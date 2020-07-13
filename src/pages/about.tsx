import Layout from "../components/ui/Layout";
import Head from "next/head";
import classes from "../styles/modules/about.module.css";

const About: React.FC = () => {
    return (
        <Layout>
            <Head>
                <title>Stem-bound - About Us</title>
            </Head>
            <h1>About Us</h1>
            <style jsx>{``}</style>
        </Layout>
    );
};

export default About;

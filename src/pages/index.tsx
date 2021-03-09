import Head from "next/head";
import StaticLayout from "../components/ui/StaticLayout";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const HomePage: React.FC = function () {
    return (
        <StaticLayout>
            <Head>
                <title>STEM-bound - Home</title>
            </Head>

            <Typography variant="h4" component="div" color="secondary">
                <Box>test</Box>
            </Typography>
            <style jsx>{``}</style>
        </StaticLayout>
    );
};

export default HomePage;

import { useContext } from "react";
import AuthContext from "../components/contexts/AuthContext";
import NotFoundSVG from "../components/svg/illustrations/not-found";
import PictureMessage from "../components/ui/PictureMessage";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import StaticLayout from "../components/ui/StaticLayout";
import AppLayout from "../components/containers/AppLayout";
import Head from "next/head";

const NotFoundPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const Layout = user ? AppLayout : StaticLayout;
    return (
        <Layout>
            <Head>
                <title>Not Found - STEM-bound</title>
            </Head>
            <PictureMessage
                Svg={NotFoundSVG}
                message="Page Not Found"
                footerEl={
                    user ? (
                        <>
                            <Typography paragraph color="textPrimary">
                                Hi {user.fullName}, looks like you're somewhere
                                that doesn't exist on STEM-bound, would you like
                                to go back to the dashboard?
                            </Typography>
                            <Link href="/app/dashboard">
                                <a>
                                    <Button color="primary" fullWidth>
                                        Take me there!
                                    </Button>
                                </a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Typography paragraph color="textPrimary">
                                Looks like you're somewhere that doesn't exist
                                on STEM-bound, would you like to go back to the
                                home page?
                            </Typography>
                            <Link href="/">
                                <a>
                                    <Button color="primary" fullWidth>
                                        Take me there!
                                    </Button>
                                </a>
                            </Link>
                        </>
                    )
                }
            />
        </Layout>
    );
};

export default NotFoundPage;

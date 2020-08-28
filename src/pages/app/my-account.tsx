import AuthContext from "../../components/contexts/AuthContext";
import useSWR from "swr";
import Head from "next/head";
import AppLayout from "../../components/containers/AppLayout";
import { userFetcher } from "../../utils/services";
import { useContext } from "react";

const MyAccountAppPage: React.FC = () => {
    const { user: storedUser } = useContext(AuthContext);
    const { data: user } = useSWR(
        storedUser?._id ? `/user/${storedUser?._id}` : null,
        userFetcher(storedUser?._id)
    );

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - Dashboard</title>
            </Head>
            <h1>My Account</h1>
            <pre>{JSON.stringify(user || storedUser, null, 2)}</pre>
        </AppLayout>
    );
};

export default MyAccountAppPage;

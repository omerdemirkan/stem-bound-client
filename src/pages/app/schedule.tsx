import AppLayout from "../../components/layouts/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import Head from "next/head";
import UnderConstruction from "../../components/ui/UnderConstruction";

const ScheduleAppPage: React.FC = () => {
    return (
        <AppLayout header="Schedule">
            <Head>
                <title>Schedule - STEM-bound</title>
            </Head>
            <UnderConstruction />
        </AppLayout>
    );
};

export default withAuth(ScheduleAppPage);

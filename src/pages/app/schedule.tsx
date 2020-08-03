import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import Head from "next/head";

const ScheduleAppPage: React.FC = () => {
    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - Schedule</title>
            </Head>
            <h4>schedule</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(ScheduleAppPage);

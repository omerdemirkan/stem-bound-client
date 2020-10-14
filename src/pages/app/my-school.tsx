import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import useSWR from "swr";
import Head from "next/head";
import AuthContext from "../../components/contexts/AuthContext";
import { userSchoolFetcher, schoolCoursesFetcher } from "../../utils/services";
import { IStudent } from "../../utils/types";
import { useContext } from "react";
import { Typography } from "@material-ui/core";
import Section from "../../components/ui/Section";

const MySchoolAppPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const { data: school } = useSWR(
        "/user/school",
        userSchoolFetcher(user._id)
    );

    const { data: courses } = useSWR(
        "/user/school/courses",
        schoolCoursesFetcher((user as IStudent).meta.school)
    );

    return (
        <AppLayout header="My School">
            <Head>
                <title>STEM-bound - My School</title>
            </Head>
            <Typography variant="h5" gutterBottom>
                {school?.name}
            </Typography>
            <Typography>{school?.location.shortDisplay}</Typography>
            <Section spacing={15}>
                <Typography variant="h5" gutterBottom>
                    Courses
                </Typography>
            </Section>
        </AppLayout>
    );
};

export default withAuth(MySchoolAppPage);

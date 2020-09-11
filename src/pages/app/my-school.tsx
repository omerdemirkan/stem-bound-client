import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import useSWR from "swr";
import Head from "next/head";
import AuthContext from "../../components/contexts/AuthContext";
import { userSchoolFetcher, schoolCoursesFetcher } from "../../utils/services";
import { IStudent } from "../../utils/types";
import { useContext } from "react";

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
            <h3>My School</h3>
            <pre>{JSON.stringify(school, null, 2)}</pre>

            <h6>Courses</h6>
            <pre>{JSON.stringify(courses, null, 2)}</pre>
        </AppLayout>
    );
};

export default withAuth(MySchoolAppPage);

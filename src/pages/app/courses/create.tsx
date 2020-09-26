import withAuth from "../../../components/hoc/withAuth";
import AppLayout from "../../../components/containers/AppLayout";
import Head from "next/head";
import { EUserRoles, EStateStatus } from "../../../utils/types";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { createCourse } from "../../../utils/services";
import AuthContext from "../../../components/contexts/AuthContext";
import CourseForm from "../../../components/forms/CourseForm";

const CreateCourseAppPage: React.FC = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const [status, setStatus] = useState<EStateStatus>(EStateStatus.idle);

    function handleSubmit(values) {
        createCourse(values)
            .then(function (res) {
                setStatus(EStateStatus.successful);
                router.push("/app/courses");
            })
            .catch(function (err) {
                setStatus(EStateStatus.failed);
            });
    }

    return (
        <AppLayout
            breadCrumbs={[
                { label: "Courses", href: "/app/courses" },
                { label: "New Course" },
            ]}
        >
            <Head>
                <title>STEM-bound - Create Course</title>
            </Head>
            {status === EStateStatus.loading ? <h3>Loading...</h3> : null}
            <CourseForm onSubmit={handleSubmit} userId={user._id} />
        </AppLayout>
    );
};

export default withAuth(CreateCourseAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

import withAuth from "../../../components/hoc/withAuth";
import AppLayout from "../../../components/containers/AppLayout";
import Head from "next/head";
import { EUserRoles } from "../../../utils/types";
import { useContext } from "react";
import { useRouter } from "next/router";
import { createCourse } from "../../../utils/services";
import AuthContext from "../../../components/contexts/AuthContext";
import CourseForm from "../../../components/forms/CourseForm";

const CreateCourseAppPage: React.FC = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    function handleSubmit(values) {
        createCourse(values).then(function (res) {
            router.push("/app/courses");
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
            <CourseForm onSubmit={handleSubmit} userId={user._id} />
        </AppLayout>
    );
};

export default withAuth(CreateCourseAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

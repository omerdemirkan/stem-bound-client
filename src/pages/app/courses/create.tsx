import withAuth from "../../../components/hoc/withAuth";
import AppLayout from "../../../components/layouts/AppLayout";
import Head from "next/head";
import { EUserRoles } from "../../../utils/types";
import { useContext } from "react";
import { useRouter } from "next/router";
import { createCourse } from "../../../utils/services";
import AuthContext from "../../../components/contexts/AuthContext";
import CourseForm from "../../../components/forms/CourseForm";
import FormCard from "../../../components/ui/FormCard";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Alert from "@material-ui/lab/Alert";

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
                <title>Create Course - STEM-bound</title>
            </Head>
            <FormCard
                header="Create A New Course"
                Icon={LibraryBooksIcon}
                headerEl={
                    <Alert severity="info">
                        By clicking submit, you create a course private to you.
                        You may update details, schedule course meetings, and
                        invite other instructors before publishing it to school
                        officials for verification. We highly encourage getting
                        in touch with a school official at the school you intend
                        on teaching a course beforehand.
                    </Alert>
                }
            >
                <CourseForm onSubmit={handleSubmit} userId={user._id} />
            </FormCard>
        </AppLayout>
    );
};

export default withAuth(CreateCourseAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

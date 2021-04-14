import withAuth from "../../../components/hoc/withAuth";
import AppLayout from "../../../components/layouts/AppLayout";
import Head from "next/head";
import { EUserRoles } from "../../../utils/types";
import { useContext, useState } from "react";
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
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmit(values) {
        try {
            setLoading(true);
            const { data: course } = await createCourse(values);
            setLoading(false);
            router.push(`/app/courses/${course._id}`);
        } catch (e) {
            setErrorMessage(e.message);
        }
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
                errorMessage={errorMessage}
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
                <CourseForm
                    onSubmit={handleSubmit}
                    userId={user._id}
                    loading={loading}
                />
            </FormCard>
        </AppLayout>
    );
};

export default withAuth(CreateCourseAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

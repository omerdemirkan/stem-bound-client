import withAuth from "../../../components/hoc/withAuth";
import AppLayout from "../../../components/containers/AppLayout";
import Head from "next/head";
import Form from "../../../components/ui/Form";
import useFormData from "../../../components/hooks/useFormData";
import { EUserRoles, EForms, EStateStatus } from "../../../utils/types";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { createCourse } from "../../../utils/services";
import AuthContext from "../../../components/contexts/AuthContext";

const CreateCourseAppPage: React.FC = () => {
    const router = useRouter();
    const formData = useFormData(EForms.CREATE_COURSE);
    const { user } = useContext(AuthContext);
    const [status, setStatus] = useState<EStateStatus>(EStateStatus.idle);

    function handleSubmit(values) {
        const courseData = formData.mapFormToRequestBody(values);
        courseData.meta.instructors = [user._id];
        createCourse(courseData)
            .then(function (res) {
                setStatus(EStateStatus.successful);
                router.push("/app/courses");
            })
            .catch(function (err) {
                setStatus(EStateStatus.failed);
            });
    }

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - Create Course</title>
            </Head>
            {status === EStateStatus.loading ? <h3>Loading...</h3> : null}
            <Form {...formData} onSubmit={handleSubmit} />
        </AppLayout>
    );
};

export default withAuth(CreateCourseAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

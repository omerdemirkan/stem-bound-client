import withAuth from "../../../components/hoc/withAuth";
import AppLayout from "../../../components/containers/AppLayout";
import Form from "../../../components/ui/Form";
import useFormData from "../../../components/hooks/useFormData";
import {
    EUserRoles,
    EForms,
    IStoreState,
    IWithAuthProps,
} from "../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
    createCourseAsync,
    resetCreateCourseStatus,
} from "../../../store/course";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CreateCourseAppPage: React.FC<IWithAuthProps> = ({
    authAttempted,
    accessToken,
    user,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const formData = useFormData(EForms.CREATE_COURSE);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const {
        course: {
            status: {
                createCourse: { loading, attempted, error },
            },
        },
    } = useSelector((state: IStoreState) => state);

    useEffect(
        function () {
            if (submitted && attempted && !error) {
                router.push("/app/courses");
            }
        },
        [attempted]
    );

    function handleSubmit(values) {
        const courseData = formData.mapFormToRequestBody(values);
        courseData.meta.instructors = [user._id];
        dispatch(createCourseAsync(courseData));
        setSubmitted(true);
    }

    return (
        <AppLayout>
            {loading ? <h3>Loading...</h3> : null}
            <Form {...formData} onSubmit={handleSubmit} />
        </AppLayout>
    );
};

export default withAuth(CreateCourseAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

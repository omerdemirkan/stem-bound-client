import withAuth from "../../../components/hoc/withAuth";
import AppLayout from "../../../components/containers/AppLayout";
import Form from "../../../components/ui/Form";
import useFormData from "../../../components/hooks/useFormData";
import { EUserRoles, EForms, IStoreState } from "../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
    createCourseAsync,
    resetCreateCourseStatus,
} from "../../../store/course";
import { useEffect } from "react";
import { useRouter } from "next/router";

const CreateCourseAppPage: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const formData = useFormData(EForms.CREATE_COURSE);
    const {
        auth: { user },
        course: {
            status: {
                createCourse: { loading, attempted, error },
            },
        },
    } = useSelector((state: IStoreState) => state);

    useEffect(() => () => dispatch(resetCreateCourseStatus()), []);

    useEffect(
        function () {
            if (attempted && !error) {
                router.push("/app/courses");
            }
        },
        [attempted]
    );

    function handleSubmit(values) {
        const courseData = formData.mapFormToRequestBody(values);
        courseData.meta.instructors = [user._id];
        dispatch(createCourseAsync(courseData));
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

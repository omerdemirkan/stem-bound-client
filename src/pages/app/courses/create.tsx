import withAuth from "../../../components/hoc/withAuth";
import AppLayout from "../../../components/ui/AppLayout";
import Form from "../../../components/ui/Form";
import useFormData from "../../../components/hooks/useFormData";
import { EUserRoles, EForms } from "../../../utils/types";
import { useDispatch } from "react-redux";

const CreateCourseAppPage: React.FC = () => {
    const dispatch = useDispatch();
    const formData = useFormData(EForms.CREATE_COURSE);

    function handleSubmit(values) {
        console.log(values);
    }
    return (
        <AppLayout>
            <Form {...formData} onSubmit={handleSubmit} />
        </AppLayout>
    );
};

export default withAuth(CreateCourseAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

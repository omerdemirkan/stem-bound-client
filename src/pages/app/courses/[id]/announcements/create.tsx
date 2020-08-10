import useFormData from "../../../../../components/hooks/useFormData";
import AuthContext from "../../../../../components/contexts/AuthContext";
import Form from "../../../../../components/ui/Form";
import AppLayout from "../../../../../components/containers/AppLayout";
import { EForms, EUserRoles } from "../../../../../utils/types";
import { useContext } from "react";
import { createAnnouncement } from "../../../../../utils/services";
import { useRouter } from "next/router";
import withAuth from "../../../../../components/hoc/withAuth";

const CreateAnnouncementAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { user } = useContext(AuthContext);
    const formData = useFormData(EForms.CREATE_ANNOUNCEMENT);

    function handleSubmit(values) {
        let body = formData.mapFormToRequestBody(values);
        body.meta = {
            from: user._id,
        };
        createAnnouncement(body, { courseId: queryCourseId as any })
            .then(function (res) {
                router.push(`/app/courses/${queryCourseId}/announcements`);
            })
            .catch(console.error);
    }
    return (
        <AppLayout>
            <Form {...formData} onSubmit={handleSubmit} />
        </AppLayout>
    );
};

export default withAuth(CreateAnnouncementAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

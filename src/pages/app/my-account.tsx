import AuthContext from "../../components/contexts/AuthContext";
import useSWR from "swr";
import Form from "../../components/ui/Form";
import Head from "next/head";
import AppLayout from "../../components/containers/AppLayout";
import Modal from "../../components/ui/Modal";
import useFormData from "../../components/hooks/useFormData";
import { userFetcher } from "../../utils/services";
import { useContext, useState } from "react";
import { getSignUpFormKeysByUserRole } from "../../utils/helpers";

const MyAccountAppPage: React.FC = () => {
    const { user: storedUser } = useContext(AuthContext);
    const { data: fetchedUser } = useSWR(
        storedUser?._id ? `/user/${storedUser?._id}` : null,
        userFetcher(storedUser?._id)
    );
    const user = fetchedUser || storedUser;
    const formKey = getSignUpFormKeysByUserRole(user?.role);
    const formData = useFormData(formKey, { initialData: user });
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - My Account</title>
            </Head>
            <h3>My Account</h3>
            <pre>{JSON.stringify(user || storedUser, null, 2)}</pre>

            <button onClick={() => setEditModalOpen(true)}>EDIT</button>
            <Modal open={editModalOpen}>
                {formData && <Form {...formData} onSubmit={console.log} />}
                <button onClick={() => setEditModalOpen(false)}>CLOSE</button>
            </Modal>
        </AppLayout>
    );
};

export default MyAccountAppPage;

import Layout from "../components/ui/Layout";
import Head from "next/head";
import Form from "../components/ui/Form";
import Select, { Option } from "../components/ui/Select";
import { useState } from "react";
import { getSignUpFormDataByRole } from "../utils/constants";
import { EUserRoles } from "../utils/types";
import { useSelector } from "react-redux";

const SignUp: React.FC = () => {
    const [userRole, setUserRole] = useState<EUserRoles | null>(null);
    const formData = getSignUpFormDataByRole(userRole);
    const loading = useSelector((state: any) => state.auth.loading);
    async function submitSignUpHandler(values: any) {}

    return (
        <Layout>
            <Head>
                <title>Stem-bound - Sign Up</title>
            </Head>
            <h1>Sign Up</h1>

            <Select onChange={(e) => setUserRole(e.target.value)}>
                <Option value={EUserRoles.INSTRUCTOR}>Instructor</Option>
                <Option value={EUserRoles.STUDENT}>Student</Option>
                <Option value={EUserRoles.SCHOOL_OFFICIAL}>
                    School Official
                </Option>
            </Select>

            {formData ? (
                <Form
                    inputs={formData.inputs}
                    isSubmitting={loading}
                    initialValues={formData.initialValues}
                    onSubmit={submitSignUpHandler}
                />
            ) : null}
        </Layout>
    );
};

export default SignUp;

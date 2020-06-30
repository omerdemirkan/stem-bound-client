import Layout from "../components/ui/Layout";
import Head from "next/head";
import { useState } from "react";
import { Formik } from "formik";
import { getSignUpFormDataByRole } from "../utils/constants";
import Form from "../components/ui/Form";
import { EUserRoles } from "../utils/types";
import Select, { Option } from "../components/ui/Select";
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
                    onSubmit={submitSignUpHandler}
                    initialValues={formData.initialValues}
                />
            ) : null}
        </Layout>
    );
};

export default SignUp;

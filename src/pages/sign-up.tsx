import Layout from "../components/ui/Layout";
import Head from "next/head";
import Form from "../components/ui/Form";
import useFormData from "../components/hooks/useFormData";
import Select, { Option } from "../components/ui/Select";
import { useState } from "react";
import { EForms } from "../utils/types";
import { useSelector } from "react-redux";

const SignUp: React.FC = () => {
    const [formKey, setFormKey] = useState<EForms>(null);
    const formData = useFormData(formKey);
    const loading = useSelector((state: any) => state.auth.loading);
    async function submitSignUpHandler(values: any) {}

    return (
        <Layout>
            <Head>
                <title>Stem-bound - Sign Up</title>
            </Head>
            <h1>Sign Up</h1>

            <Select onChange={(e) => setFormKey(e.target.value)}>
                <Option value={EForms.INSTRUCTOR_SIGN_UP}>Instructor</Option>
                <Option value={EForms.STUDENT_SIGN_UP}>Student</Option>
                <Option value={EForms.SCHOOL_OFFICIAL_SIGN_UP}>
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

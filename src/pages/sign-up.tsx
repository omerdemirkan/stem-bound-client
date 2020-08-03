import Layout from "../components/ui/Layout";
import Head from "next/head";
import Form from "../components/ui/Form";
import useFormData from "../components/hooks/useFormData";
import Select, { Option } from "../components/ui/Select";
import AuthContext from "../components/contexts/AuthContext";
import { getUserRoleBySignUpFormKey } from "../utils/helpers";
import { EForms, IFormData } from "../utils/types";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

const SignUpPage: React.FC = () => {
    const [formKey, setFormKey] = useState<EForms>(null);
    const formData: IFormData = useFormData(formKey);
    const router = useRouter();
    const { authLoading, accessToken, signup } = useContext(AuthContext);

    async function submitSignUpHandler(values: any): Promise<void> {
        const userData = {
            ...formData.mapFormToRequestBody(values),
            role: getUserRoleBySignUpFormKey(formKey),
        };
        signup(userData);
    }

    useEffect(
        function () {
            if (accessToken) {
                router.push("/app/dashboard");
            }
        },
        [accessToken]
    );

    return (
        <Layout>
            <Head>
                <title>STEM-bound - Sign Up</title>
            </Head>
            <h1>Sign Up</h1>

            <Select
                onChange={(e) => setFormKey(e.target.value)}
                id="user-type"
                label="User Type"
            >
                <Option value={EForms.INSTRUCTOR_SIGN_UP}>Instructor</Option>
                <Option value={EForms.STUDENT_SIGN_UP}>Student</Option>
                <Option value={EForms.SCHOOL_OFFICIAL_SIGN_UP}>
                    School Official
                </Option>
            </Select>

            {formData ? (
                <Form
                    isSubmitting={authLoading}
                    onSubmit={submitSignUpHandler}
                    {...formData}
                />
            ) : null}
            <style jsx>{``}</style>
        </Layout>
    );
};

export default SignUpPage;

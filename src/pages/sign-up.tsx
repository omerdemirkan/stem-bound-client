import Layout from "../components/ui/Layout";
import Head from "next/head";
import Form from "../components/ui/Form";
import useFormData from "../components/hooks/useFormData";
import classes from "../styles/modules/sign-up.module.css";
import Select, { Option } from "../components/ui/Select";
import { getUserRoleBySignUpFormKey } from "../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { EForms, IFormData } from "../utils/types";
import { useState, useEffect } from "react";
import { signUpAsync } from "../store/auth";
import { useRouter } from "next/router";

const SignUp: React.FC = () => {
    const [formKey, setFormKey] = useState<EForms>(null);
    const formData: IFormData = useFormData(formKey);
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        loading,
        accessToken,
    }: { loading: boolean; accessToken: string | null } = useSelector(
        (state: any) => state.auth
    );
    async function submitSignUpHandler(values: any): Promise<void> {
        const userData = {
            ...formData.mapFormToRequestBody(values),
            role: getUserRoleBySignUpFormKey(formKey),
        };
        dispatch(signUpAsync(userData));
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
                    isSubmitting={loading}
                    onSubmit={submitSignUpHandler}
                    {...formData}
                />
            ) : null}
            <style jsx>{``}</style>
        </Layout>
    );
};

export default SignUp;

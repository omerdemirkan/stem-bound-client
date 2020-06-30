import Layout from "../components/ui/Layout";
import Head from "next/head";
import { useState } from "react";
import { Formik } from "formik";
import { getSignUpFormDataByRole } from "../utils/constants";
import Form from "../components/ui/Form";
import { EUserRoles } from "../utils/types";
import Select, { Option } from "../components/ui/Select";

const SignUp: React.FC = () => {
    const [userRole, setUserRole] = useState<EUserRoles | null>(null);
    const formData = getSignUpFormDataByRole(userRole);

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
                <Formik
                    initialValues={formData.initialValues}
                    onSubmit={submitSignUpHandler}
                >
                    {({ handleSubmit, handleChange, values }) => (
                        <Form
                            inputs={formData.inputs}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            values={values}
                        />
                    )}
                </Formik>
            ) : null}
        </Layout>
    );
};

export default SignUp;

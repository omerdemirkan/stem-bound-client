import Layout from "../components/Layout";
import Head from "next/head";
import { EUserRoles } from "../utils/types";
import { useState } from "react";
import Select, { Option } from "../components/Select";
import { Formik } from "formik";
import { getSignUpFormDataByRole } from "../utils/constants";

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

            <Formik
                initialValues={formData.initialValues || {}}
                onSubmit={submitSignUpHandler}
            >
                {() => (
                    <form>
                        <Select onChange={console.log}>
                            <Option value={EUserRoles.INSTRUCTOR}>
                                Instructor
                            </Option>
                            <Option value={EUserRoles.SCHOOL_OFFICIAL}>
                                School Official
                            </Option>
                            <Option value={EUserRoles.STUDENT}>Student</Option>
                        </Select>
                    </form>
                )}
            </Formik>
        </Layout>
    );
};

export default SignUp;

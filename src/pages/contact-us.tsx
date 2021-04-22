import StaticLayout from "../components/layouts/StaticLayout";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import FormCard from "../components/ui/FormCard";
import SendIcon from "@material-ui/icons/Send";
import FadeIn from "../components/ui/FadeIn";
import ContactUsForm from "../components/forms/ContactUsForm";

const ContactUsPage: React.FC = () => {
    const { register, handleSubmit, errors } = useForm();

    function onSubmit(values) {
        console.log(values);
    }

    return (
        <StaticLayout>
            <Head>
                <title>STEM-bound - Volunteer Application Submission</title>
            </Head>
            <FadeIn delayMs={100}>
                <FormCard header="Contact Us" Icon={SendIcon}>
                    <ContactUsForm onSubmit={onSubmit} />
                </FormCard>
            </FadeIn>
        </StaticLayout>
    );
};

export default ContactUsPage;

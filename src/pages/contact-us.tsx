import StaticLayout from "../components/layouts/StaticLayout";
import Head from "next/head";
import FormCard from "../components/ui/FormCard";
import SendIcon from "@material-ui/icons/Send";
import ContactUsForm from "../components/forms/ContactUsForm";
import Container from "@material-ui/core/Container";
import { contactUs } from "../utils/services";
import { ENotificationTypes, IContactData } from "../utils/types";
import { useContext } from "react";
import NotificationContext from "../components/contexts/NotificationContext";
import { useRouter } from "next/router";

const ContactUsPage: React.FC = () => {
    const { createAlert, createSnackbar } = useContext(NotificationContext);
    const router = useRouter();
    async function onSubmit(values: IContactData) {
        try {
            await contactUs(values);
            createAlert({
                headerText: "Thanks for contacting us!",
                bodyText:
                    "We'll try to get back to you by email as soon as possible.",
                type: ENotificationTypes.INFO,
                onOk() {
                    router.push("/");
                },
            });
        } catch (e) {
            createSnackbar({
                text: "An error occured",
                type: "error",
            });
        }
    }

    return (
        <StaticLayout>
            <Head>
                <title>STEM-bound - Volunteer Application Submission</title>
            </Head>
            <Container maxWidth="md">
                <FormCard header="Contact Us" Icon={SendIcon}>
                    <ContactUsForm onSubmit={onSubmit} />
                </FormCard>
            </Container>
        </StaticLayout>
    );
};

export default ContactUsPage;

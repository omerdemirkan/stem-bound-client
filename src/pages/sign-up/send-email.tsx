import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import AuthContext from "../../components/contexts/AuthContext";
import StaticLayout from "../../components/ui/StaticLayout";
import { getSignUpEmailRecipient } from "../../utils/services";

const SendEmailPage: React.FC = () => {
    const { accessToken } = useContext(AuthContext);
    const router = useRouter();

    const emailRef = useRef<string>();
    emailRef.current = emailRef.current || getSignUpEmailRecipient();
    const email = emailRef.current;

    useEffect(
        function () {
            if (accessToken) {
                router.push("/app/dashboard");
            }
        },
        [accessToken]
    );

    return (
        <StaticLayout>
            {email ? (
                <>
                    <Typography variant="h4">
                        An email was sent to {email}
                    </Typography>
                    <Typography paragraph>
                        If you don't find an email from us in your inbox, check
                        your spam and junk email folders.
                    </Typography>
                </>
            ) : null}
        </StaticLayout>
    );
};

export default SendEmailPage;

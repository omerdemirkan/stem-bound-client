import Link from "next/link";
import Button, { ButtonProps } from "@material-ui/core/Button";

interface Props extends ButtonProps {
    userId: string;
}

const ContactUserButton: React.FC<Props> = ({
    children,
    userId,
    ...ButtonProps
}) => {
    return (
        <Link href={`/app/messaging?contact=${userId}`}>
            <a>
                <Button {...ButtonProps}>{children}</Button>
            </a>
        </Link>
    );
};

export default ContactUserButton;

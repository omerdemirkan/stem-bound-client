import Link from "next/link";
import Button, { ButtonProps } from "@material-ui/core/Button";

export interface IContactUserButtonProps extends ButtonProps {
    userId: string;
}

const ContactUserButton: React.FC<IContactUserButtonProps> = ({
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

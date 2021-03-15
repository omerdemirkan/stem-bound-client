import Link from "next/link";
import Button, { ButtonProps } from "@material-ui/core/Button";
import LinkNewTab from "./LinkNewTab";

export interface IContactUserButtonProps extends ButtonProps {
    userId: string;
    newTab?: boolean;
}

const ContactUserButton: React.FC<IContactUserButtonProps> = ({
    children,
    userId,
    newTab,
    ...ButtonProps
}) => {
    const LinkComponent = newTab ? LinkNewTab : Link;

    return (
        <LinkComponent
            href="/app/messaging"
            as={`/app/messaging?contact=${userId}`}
        >
            <a>
                <Button {...ButtonProps}>{children}</Button>
            </a>
        </LinkComponent>
    );
};

export default ContactUserButton;

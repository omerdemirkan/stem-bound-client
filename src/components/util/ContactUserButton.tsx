import Link, { LinkProps } from "next/link";
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
    const LinkComponent: React.FC<LinkProps> = newTab
        ? LinkNewTab
        : ({ children, ...props }) => (
              <Link {...props}>
                  <a>{children}</a>
              </Link>
          );

    return (
        <LinkComponent
            href="/app/messaging"
            as={`/app/messaging?contact=${userId}`}
        >
            <Button {...ButtonProps}>{children}</Button>
        </LinkComponent>
    );
};

export default ContactUserButton;

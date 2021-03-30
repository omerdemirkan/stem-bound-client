import Link, { LinkProps } from "next/link";
import Button, { ButtonProps } from "@material-ui/core/Button";
import LinkNewTab from "./LinkNewTab";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import NotificationContext from "../contexts/NotificationContext";
import { ENotificationTypes } from "../../utils/types";

export interface IContactUserButtonProps extends ButtonProps {
    userId: string;
    newTab?: boolean;
}

const ContactUserButton: React.FC<IContactUserButtonProps> = ({
    children,
    userId,
    newTab,
    ...buttonProps
}) => {
    const { user } = useContext(AuthContext);
    const { createAlert } = useContext(NotificationContext);

    if (!user)
        return (
            <Button
                {...buttonProps}
                onClick={() =>
                    createAlert({
                        headerText: "You aren't logged in!",
                        bodyText: "You must be logged in to contact this user.",
                        type: ENotificationTypes.INFO,
                    })
                }
            >
                {children}
            </Button>
        );

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
            <Button {...buttonProps}>{children}</Button>
        </LinkComponent>
    );
};

export default ContactUserButton;

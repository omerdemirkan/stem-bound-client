import useNavigationData from "../hooks/useNavigationData";
import NavigationButton from "../ui/NavigationButton";
import AuthContext from "../contexts/AuthContext";
import NotificationContext from "../contexts/NotificationContext";
import { useRouter } from "next/router";
import { INavigationDataButton, ENotificationTypes } from "../../utils/types";
import { useContext } from "react";

const AppLayout: React.FC = ({ children }) => {
    const router = useRouter();
    const navigationData = useNavigationData();
    const { logout } = useContext(AuthContext);
    const { createAlert } = useContext(NotificationContext);

    function logoutHandler() {
        logout();
        router.push("/");
    }

    return (
        <>
            <div>
                <nav>
                    <ul>
                        {navigationData?.buttons.map(
                            (button: INavigationDataButton) => (
                                <li key={button.text}>
                                    <NavigationButton
                                        path={button.path}
                                        text={button.text}
                                        Icon={button.Icon}
                                    />
                                </li>
                            )
                        )}
                    </ul>

                    <button
                        onClick={() =>
                            createAlert({
                                headerText: "Are you sure you want to log out?",
                                bodyText: "This is a body text",
                                type: ENotificationTypes.DANGER,
                                onOk: logoutHandler,
                                onCancel: () => {},
                            })
                        }
                    >
                        LOGOUT
                    </button>
                </nav>
                <div>{children}</div>
            </div>
            <style jsx>{``}</style>
        </>
    );
};

export default AppLayout;

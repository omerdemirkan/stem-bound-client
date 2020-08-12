import useNavigationData from "../hooks/useNavigationData";
import NavigationButton from "../ui/NavigationButton";
import AuthContext from "../contexts/AuthContext";
import AlertModal, { AlertModalFooter } from "../ui/AlertModal";
import { useRouter } from "next/router";
import { INavigationDataButton } from "../../utils/types";
import { useState, useContext } from "react";

const AppLayout: React.FC = ({ children }) => {
    const router = useRouter();
    const navigationData = useNavigationData();
    const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>();
    const { logout } = useContext(AuthContext);

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

                    <button onClick={() => setLogoutModalOpen(true)}>
                        LOGOUT
                    </button>
                </nav>
                <div>{children}</div>
            </div>
            <AlertModal
                open={logoutModalOpen}
                headerText="Are you sure you want to log out?"
                bodyText="This is a body text"
                onClose={() => setLogoutModalOpen(false)}
            >
                <AlertModalFooter>
                    <button onClick={() => setLogoutModalOpen(false)}>
                        CANCEL
                    </button>
                    <button onClick={logoutHandler}>YES</button>
                </AlertModalFooter>
            </AlertModal>
            <style jsx>{``}</style>
        </>
    );
};

export default AppLayout;

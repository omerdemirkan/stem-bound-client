import useNavigationData from "../hooks/useNavigationData";
import NavigationButton from "../ui/NavigationButton";
import AuthContext from "../contexts/AuthContext";
import Modal, { ModalFooter } from "../ui/Modal";
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
                        {navigationData
                            ? navigationData.buttons.map(
                                  (button: INavigationDataButton) => (
                                      <li key={button.text}>
                                          <NavigationButton
                                              path={button.path}
                                              text={button.text}
                                              Icon={button.Icon}
                                          />
                                      </li>
                                  )
                              )
                            : null}
                    </ul>

                    <button onClick={() => setLogoutModalOpen(true)}>
                        LOGOUT
                    </button>
                </nav>
                <div>{children}</div>
            </div>
            <Modal
                open={logoutModalOpen}
                headerText="Are you sure you want to log out?"
                bodyText="This is a body text"
                onClose={() => setLogoutModalOpen(false)}
            >
                <ModalFooter>
                    <button onClick={() => setLogoutModalOpen(false)}>
                        CANCEL
                    </button>
                    <button onClick={logoutHandler}>YES</button>
                </ModalFooter>
            </Modal>
            <style jsx>{``}</style>
        </>
    );
};

export default AppLayout;

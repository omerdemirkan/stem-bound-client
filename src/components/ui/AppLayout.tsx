import Link from "next/link";
import useNavigationData from "../hooks/useNavigationData";
import NavigationButton from "./NavigationButton";
import Modal, { ModalFooter } from "./Modal";
import { useRouter } from "next/router";
import { apiClient } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth";
import { INavigationDataButton } from "../../utils/types";
import { useState } from "react";

const AppLayout: React.FC = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const navigationData = useNavigationData();
    const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>();

    function logoutHandler() {
        apiClient.deleteAuthHeader();
        localStorage.removeItem("accessToken");
        dispatch(logout());
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

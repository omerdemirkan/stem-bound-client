import Link from "next/link";
import classes from "./app-layout.module.css";
import useNavigationData from "../../hooks/useNavigationData";
import { useRouter } from "next/router";
import { apiClient } from "../../../utils/helpers";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/auth";
import { INavigationDataButton } from "../../../utils/types";
import NavigationButton from "../NavigationButton";

const AppLayout: React.FC = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const navigationData = useNavigationData();

    function logoutHandler() {
        apiClient.deleteAuthHeader();
        localStorage.removeItem("accessToken");
        dispatch(logout());
        router.push("/");
    }

    console.log(navigationData.buttons);
    return (
        <div>
            <nav>
                <ul>
                    {navigationData.buttons.map(
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
            </nav>
            <div>{children}</div>
        </div>
    );
};

export default AppLayout;

import classes from "./app-layout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { apiClient } from "../../../utils/helpers";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/auth";

const AppLayout: React.FC = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    function logoutHandler() {
        apiClient.deleteAuthHeader();
        localStorage.removeItem("accessToken");
        dispatch(logout());
        router.push("/");
    }
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href="/app/dashboard">
                            <a>dashboard</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/app/courses">
                            <a>my courses</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/app/search">
                            <a>search</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/app/messaging">
                            <a>messaging</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/app/notifications">
                            <a>notifications</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/app/schedule">
                            <a>schedule</a>
                        </Link>
                    </li>
                    <li>
                        <a onClick={logoutHandler}>logout</a>
                    </li>
                </ul>
            </nav>
            <div>{children}</div>
        </div>
    );
};

export default AppLayout;

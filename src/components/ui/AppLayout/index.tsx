import classes from "./app-layout.module.css";
import Link from "next/link";

const AppLayout: React.FC = ({ children }) => {
    return (
        <div>
            <nav>
                <Link href="/app/dashboard">
                    <a>dashboard</a>
                </Link>
                <Link href="/app/courses">
                    <a>my courses</a>
                </Link>
                <Link href="/app/search">
                    <a>search</a>
                </Link>
                <Link href="/app/messaging">
                    <a>messaging</a>
                </Link>
                <Link href="/app/notifications">
                    <a>notifications</a>
                </Link>
                <Link href="/app/schedule">
                    <a>schedule</a>
                </Link>
            </nav>
            <div>{children}</div>
        </div>
    );
};

export default AppLayout;

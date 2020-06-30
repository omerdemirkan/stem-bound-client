import Link from "next/link";
import classes from "./layout.module.css";

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <div className={classes.main}>
                <nav>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <Link href="/about">
                        <a>About</a>
                    </Link>
                    <Link href="/search">
                        <a>Search</a>
                    </Link>
                    <Link href="/log-in">
                        <a>Log In</a>
                    </Link>
                    <Link href="/sign-up">
                        <a>Sign Up</a>
                    </Link>
                    <Link href="/search">
                        <a>Search</a>
                    </Link>
                </nav>
                {children}
            </div>
            <footer>
                <h3>STEM_BOUND™ EDUCATION</h3>
            </footer>
        </>
    );
};

export default Layout;

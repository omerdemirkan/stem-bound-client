import Link from "next/link";

const Layout: React.FC = ({ children }) => {
    return (
        <div>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/search">Search</Link>
                <Link href="/log-in">Log In</Link>
                <Link href="/sign-up">Sign Up</Link>
            </nav>
            {children}
        </div>
    );
};

export default Layout;

import Link from "next/link";

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <div className="main">
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
                </nav>
                {children}
            </div>
            <footer>
                <h3>STEM_BOUND™ EDUCATION</h3>
            </footer>

            <style jsx>{`
                .main {
                    min-height: 100vh;
                }
            `}</style>
        </>
    );
};

export default Layout;

import Navbar from "./Navbar";
import Footer from "./Footer";

const StaticLayout: React.FC = ({ children }) => {
    return (
        <>
            <div className="main">
                <Navbar />
                {children}
            </div>
            <Footer />

            <style jsx>{`
                .main {
                    min-height: 100vh;
                }
            `}</style>
        </>
    );
};

export default StaticLayout;

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
                    margin: 0;
                    padding: 0;
                }
            `}</style>
        </>
    );
};

export default StaticLayout;

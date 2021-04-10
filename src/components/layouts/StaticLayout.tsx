import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import Typography from "@material-ui/core/Typography";

export interface IStaticLayoutProps {
    header?: string;
}

const StaticLayout: React.FC<IStaticLayoutProps> = ({ header, children }) => {
    return (
        <>
            <div className="main">
                <Navbar />
                {header && (
                    <Typography
                        variant="h4"
                        component="h1"
                        align="center"
                        gutterBottom
                        style={{ margin: "30px 0" }}
                    >
                        {header}
                    </Typography>
                )}
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

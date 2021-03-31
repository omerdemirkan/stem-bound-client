import Navbar from "./Navbar";
import Footer from "./Footer";
import { Typography } from "@material-ui/core";

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

import StaticNavbar from "../ui/StaticNavbar";
import Typography from "@material-ui/core/Typography";

export interface IStaticLayoutProps {
    header?: string;
}

const StaticLayout: React.FC<IStaticLayoutProps> = ({ header, children }) => {
    return (
        <>
            <div className="main">
                <StaticNavbar />
                {header && (
                    <Typography
                        variant="h4"
                        component="h1"
                        align="center"
                        gutterBottom
                        style={{ margin: "20px 0" }}
                    >
                        {header}
                    </Typography>
                )}
                {children}
            </div>
            <div className="footer-wrapper">
                <div className="footer-info">
                    <img
                        id="footer-logo"
                        src="footer-logo.svg"
                        alt="stem-bound-logo"
                    />
                    <Typography component="p" color="textSecondary">
                        {`© STEM-bound ${new Date().getFullYear()} ALL RIGHTS RESERVED`}
                    </Typography>
                </div>

                <div className="footer-contact">
                    <img
                        src="email-icon.svg"
                        alt="email-icon"
                        className="footer-icon"
                    />
                    <img
                        src="github-icon.svg"
                        alt="github-icon"
                        className="footer-icon"
                    />
                    <img
                        src="linkedin-icon.svg"
                        alt="linkedn-icon"
                        className="footer-icon"
                    />
                </div>
            </div>

            <style jsx>{`
                .main {
                    min-height: 100vh;
                    margin: 0;
                    padding: 0;
                }
                .footer-wrapper {
                    margin: 0;
                    min-height: 100px;
                    background-color: var(--background-dark);
                    display: flex;
                    justify-content: space-between;
                    padding: 20px 50px;
                }
                .footer-info {
                    display: flex;
                    align-items: center;
                }
                #footer-logo {
                    max-height: 60px;
                    max-width: 60px;
                    margin-right: 40px;
                }

                .footer-contact {
                    width: 200px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                }
                .footer-icon {
                    max-height: 28px;
                    max-width: 28px;
                    cursor: pointer;
                    position: relative;
                    opacity: 1;
                    transition: 0.2s ease;
                }
                .footer-icon:hover {
                    opacity: 0.8;
                }

                @media (max-width: 900px) {
                    .footer-wrapper {
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                }
            `}</style>
        </>
    );
};

export default StaticLayout;

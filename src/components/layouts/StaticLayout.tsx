import StaticNavbar from "../ui/StaticNavbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Logo from "../ui/Logo";
import Link from "next/link";

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
                        color="textSecondary"
                        style={{ margin: "20px 0" }}
                    >
                        {header}
                    </Typography>
                )}
                {children}
            </div>
            <Divider />
            <div className="footer">
                <div className="footer-info">
                    <Logo width="60px" height="60px" />
                    <Typography component="span" variant="overline">
                        {`© STEM-bound ${new Date().getFullYear()}`}
                    </Typography>
                </div>
                <Divider orientation="vertical" />

                <div className="footer-actions">
                    <a href="mailto:omerfarukpiano@gmail.com">
                        <Typography component="span" variant="overline">
                            Email
                        </Typography>
                    </a>
                    <br />
                    <Link href="/contact-us">
                        <a>
                            <Typography component="span" variant="overline">
                                Contact Us
                            </Typography>
                        </a>
                    </Link>
                    <br />
                    <a
                        href="https://github.com/omerdemirkan/stem-bound-api"
                        target="_blank"
                    >
                        <Typography component="span" variant="overline">
                            Github
                        </Typography>
                    </a>
                </div>
            </div>

            <style jsx>{`
                .main {
                    min-height: 100vh;
                    margin: 0;
                    padding: 0;
                }
                .footer {
                    display: flex;
                    justify-content: center;
                    align-items: stretch;
                    padding: 20px;
                }
                .footer > * {
                    margin: 0 20px;
                }
                .footer-info {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }
            `}</style>
        </>
    );
};

export default StaticLayout;

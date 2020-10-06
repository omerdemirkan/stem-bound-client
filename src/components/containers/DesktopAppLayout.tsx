import { ETheme } from "../../utils/types";
import { useContext } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "next/link";
import WordLogoSVG from "../svg/icons/word-logo";
import AppNavigation from "./AppNavigation";
import { IAppLayoutProps } from "./AppLayout";
import ThemeContext from "../contexts/ThemeContext";

const useStyles = makeStyles({
    finePrint: {
        position: "absolute",
        bottom: "0",
        left: "0",
        textAlign: "center",
        width: "280px",
    },
});

const DesktopAppLayout: React.FC<IAppLayoutProps> = ({
    children,
    header,
    breadCrumbs,
    footerEl,
}) => {
    const { theme } = useContext(ThemeContext);

    const classes = useStyles();

    if (header && !breadCrumbs) {
        breadCrumbs = [
            {
                label: header,
            },
        ];
    }

    return (
        <div className={`root ${theme === ETheme.DARK ? "dark-theme" : null}`}>
            <aside className="sidebar">
                <div className="logo-box">
                    <WordLogoSVG width="60px" />
                </div>

                <AppNavigation />
                <Typography
                    paragraph
                    gutterBottom
                    color="textSecondary"
                    className={classes.finePrint}
                >
                    STEM-BOUND EDUCATION™
                </Typography>
            </aside>

            <main className="main">
                <div className="main-header">
                    <Breadcrumbs>
                        {breadCrumbs?.map(function (
                            { label, href, shallow, as },
                            index
                        ) {
                            const isLast = index === breadCrumbs.length - 1;
                            let bc = (
                                <Typography
                                    key={label + href}
                                    variant="h6"
                                    color={
                                        isLast ? "textPrimary" : "textSecondary"
                                    }
                                    gutterBottom
                                >
                                    {label}
                                </Typography>
                            );
                            if (href) {
                                bc = (
                                    <Link
                                        href={href}
                                        as={as}
                                        shallow={shallow}
                                        key={label + href}
                                    >
                                        <a>{bc}</a>
                                    </Link>
                                );
                            }
                            return bc;
                        })}
                    </Breadcrumbs>
                    <Divider />
                </div>
                <div className="main-body">{children}</div>
                <div
                    className="main-footer"
                    style={footerEl ? undefined : { display: "none" }}
                >
                    {footerEl}
                </div>
            </main>
            <style jsx>{`
                @media (min-width: 900px) {
                    .root {
                        display: grid;
                        height: 100vh;
                        grid-template-columns: 280px auto;
                        position: relative;
                        overflow: hidden;
                        background-color: var(--background-light);
                    }

                    .sidebar {
                        padding: 0 15px;
                    }

                    .logo-box {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 120px;
                        padding: 0 40px;
                    }

                    .user-box {
                        padding: 30px 50px;
                        padding-right: 0;
                    }

                    .main {
                        margin: 20px 0;
                        background-color: var(--background-dark);
                        border-top-left-radius: 20px;
                        border-bottom-left-radius: 20px;

                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                    }

                    .main-header {
                        padding: 40px 60px 0;
                        z-index: 8;
                    }

                    .main-body {
                        overflow-y: auto;
                        padding: 20px 60px 60px;
                    }

                    .main-footer {
                        padding: 20px 60px;
                        z-index: 8;
                        margin-top: auto;
                    }
                }

                @media (max-width: 900px) {
                    .sidebar {
                        display: none;
                    }
                    .main {
                        padding: 30px;
                        display: block;
                        min-height: 100vh;
                        background-color: var(--background-dark);
                    }
                }
            `}</style>
        </div>
    );
};

export default DesktopAppLayout;

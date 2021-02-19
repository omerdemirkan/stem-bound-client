import { ETheme } from "../../utils/types";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import AppNavigation from "./AppNavigation";
import { IAppLayoutProps } from "./AppLayout";
import ThemeContext from "../contexts/ThemeContext";
import { paginateBreadCrumbs } from "../util/paginateBreadCrumbs";
import Logo from "../ui/Logo";

const useStyles = makeStyles({
    finePrint: {
        position: "absolute",
        bottom: "0",
        left: "0",
        textAlign: "center",
        width: "260px",
        fontSize: "0.9rem",
    },
});

const DesktopAppLayout: React.FC<IAppLayoutProps> = ({
    children,
    header,
    breadCrumbs,
    mainContainerProps,
    actionEl,
    footerEl,
}) => {
    const { theme } = useContext(ThemeContext);

    const classes = useStyles();

    return (
        <div className={`root ${theme === ETheme.DARK ? "dark-theme" : null}`}>
            <aside className="sidebar">
                <Logo theme={theme} type="word" beta padding="30px" />

                <AppNavigation />
                <Typography
                    paragraph
                    gutterBottom
                    color="textSecondary"
                    component="span"
                    className={classes.finePrint}
                >
                    STEM-BOUND EDUCATION™
                </Typography>
            </aside>

            <main className="main">
                <div className="header">
                    {paginateBreadCrumbs(breadCrumbs)}
                    <div className="action">{actionEl}</div>
                </div>
                <Divider />
                <div
                    {...mainContainerProps}
                    className={`body ${mainContainerProps?.className || ""}`}
                >
                    {children}
                </div>
                <div
                    className="footer"
                    style={footerEl ? undefined : { display: "none" }}
                >
                    {footerEl}
                </div>
            </main>
            <style jsx>{`
                .root {
                    display: grid;
                    height: 100vh;
                    grid-template-columns: 260px auto;
                    position: relative;
                    overflow: hidden;
                    background-color: var(--background-light);
                }

                .sidebar {
                    padding: 0 12px;
                }

                .logo-box {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 120px;
                    padding: 0 30px;
                }

                .main {
                    margin: 20px 0;
                    background-color: var(--background-dark);
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 10px;
                    padding: 25px 35px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .main .header {
                    z-index: 8;
                    padding-bottom: 8px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                }

                .main .body {
                    overflow-y: auto;
                    padding: 16px 0;
                    height: 100%;
                }

                .main .footer {
                    padding-top: 20px;
                    z-index: 8;
                    margin-top: auto;
                }
            `}</style>
        </div>
    );
};

export default DesktopAppLayout;

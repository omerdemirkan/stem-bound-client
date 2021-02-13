import { IAppLayoutProps } from "./AppLayout";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useContext, useState } from "react";
import AppNavigation from "./AppNavigation";
import Drawer from "@material-ui/core/Drawer";
import WordLogoSVG from "../svg/icons/word-logo";
import useDimensions from "../../hooks/useDimensions";
import { paginateBreadcrumbsMinified } from "../util/paginateBreadCrumbs";
import ThemeContext from "../contexts/ThemeContext";
import { ETheme } from "../../utils/types";
import WordLogoDarkModeSVG from "../svg/icons/word-logo-dark-mode";

const useStyles = makeStyles({
    toolBar: {
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: "0",
    },
    drawer: {
        padding: "0 5px",
    },
    footerAppBar: {
        top: "auto",
        bottom: "0",
        padding: "2vw 0",
    },
});

const MobileAppLayout: React.FC<IAppLayoutProps> = ({
    children,
    breadCrumbs,
    footerEl,
    mainContainerProps,
    actionEl,
}) => {
    const classes = useStyles();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    const [headerAppbarRef, headerDimensions] = useDimensions();
    const [footerAppbarRef, footerDimensions] = useDimensions();
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={`root ${theme === ETheme.DARK ? "dark-theme" : null}`}
            style={{
                paddingTop: headerDimensions?.height
                    ? headerDimensions?.height + "px"
                    : "0",
                paddingBottom: footerDimensions?.height
                    ? footerDimensions?.height + "px"
                    : "0",
            }}
        >
            <AppBar color="default" ref={headerAppbarRef}>
                <Toolbar className={classes.toolBar}>
                    <header className="mobile-navigation-header">
                        {paginateBreadcrumbsMinified(breadCrumbs)}
                    </header>
                    <IconButton
                        color="inherit"
                        aria-label="Menu"
                        onClick={toggleSidebar}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={sidebarOpen}
                onClose={toggleSidebar}
                className={classes.drawer}
            >
                <div className="navigation-wrapper">
                    <div className="logo-box">
                        {theme === ETheme.DARK ? (
                            <WordLogoDarkModeSVG />
                        ) : (
                            <WordLogoSVG />
                        )}
                    </div>
                    <AppNavigation />
                </div>
            </Drawer>

            <main {...mainContainerProps}>
                {actionEl ? <div className="action">{actionEl}</div> : null}
                {children}
            </main>
            {footerEl && (
                <AppBar
                    color="default"
                    className={classes.footerAppBar}
                    ref={footerAppbarRef}
                >
                    <Toolbar>{footerEl}</Toolbar>
                </AppBar>
            )}

            <style jsx>{`
                .root {
                    background-color: var(--background-dark);
                    min-height: 100vh;
                }
                .root > main {
                    padding: 5vw 2vw;
                    height: 100%;
                }
                .logo-box {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 90px;
                    padding: 0 40px;
                    max-width: 250px;
                }
                .mobile-navigation-header {
                    padding: 3vw 5vw 3vw;
                    display: flex;
                    align-items: center;
                }

                .action {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    flex-wrap: wrap;
                    padding: 12px 0 20px;
                }

                .main-footer {
                    padding: 2vw;
                    z-index: 8;
                }

                .navigation-wrapper {
                    padding: 0 8px;
                }
            `}</style>
        </div>
    );
};

export default MobileAppLayout;

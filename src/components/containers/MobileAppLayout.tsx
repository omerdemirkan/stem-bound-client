import { IAppLayoutProps } from "./AppLayout";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useRef, useState } from "react";
import AppNavigation from "./AppNavigation";
import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import WordLogoSVG from "../svg/icons/word-logo";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { Breadcrumbs } from "@material-ui/core";

const useStyles = makeStyles({
    appBar: {
        top: "auto",
        bottom: "0",
    },
    toolBar: {},
    drawer: {},
});

const MobileAppLayout: React.FC<IAppLayoutProps> = ({
    children,
    breadCrumbs,
    header,
}) => {
    const classes = useStyles();
    const rootRef = useRef<HTMLDivElement>();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const smallScreen = useMediaQuery("(max-width: 900px)");
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <div className="root" ref={rootRef}>
            <div
                className="mobile-navigation-wrapper"
                aria-hidden={!smallScreen}
                style={{ display: smallScreen ? "block" : "none" }}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={toggleSidebar}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Drawer
                    anchor="left"
                    open={sidebarOpen}
                    onClose={toggleSidebar}
                    className={classes.drawer}
                >
                    <div className="logo-box">
                        <WordLogoSVG width="60px" />
                    </div>
                    <AppNavigation />
                </Drawer>

                <header className="mobile-header">
                    {breadCrumbs.length >= 2
                        ? (function () {
                              const backBreadCrumb =
                                  breadCrumbs[breadCrumbs.length - 2];
                              if (!backBreadCrumb.href) return null;
                              return (
                                  <Link href={backBreadCrumb.href}>
                                      <ArrowBackIosIcon color="inherit" />
                                  </Link>
                              );
                          })()
                        : null}
                    <Breadcrumbs style={{ display: "inline" }}>
                        {breadCrumbs.length >= 3 ? <span>...</span> : null}

                        <Typography variant="h6">
                            {breadCrumbs[breadCrumbs.length - 1].label}
                        </Typography>
                    </Breadcrumbs>
                </header>
            </div>

            {children}
            <style jsx>{`
                .logo-box {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 90px;
                    padding: 0 40px;
                    max-width: 250px;
                }
                .mobile-header {
                    padding: 3vw 5vw 3vw;
                    background-color: var(--background-dark);
                    display: flex;
                    align-items: center;
                }
            `}</style>
        </div>
    );
};

export default MobileAppLayout;

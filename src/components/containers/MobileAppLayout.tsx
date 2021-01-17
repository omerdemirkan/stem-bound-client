import { IAppLayoutProps } from "./AppLayout";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import AppNavigation from "./AppNavigation";
import Drawer from "@material-ui/core/Drawer";
import WordLogoSVG from "../svg/icons/word-logo";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Link from "next/link";
import useDimensions from "../hooks/useDimensions";
import { paginateBreadcrumbsMinified } from "../util/paginateBreadCrumbs";

const useStyles = makeStyles({
    toolBar: {
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: "0",
    },
    drawer: {},
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
}) => {
    const classes = useStyles();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    const [headerAppbarRef, headerDimensions] = useDimensions();
    const [footerAppbarRef, footerDimensions] = useDimensions();

    return (
        <div
            className="root"
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
                        {breadCrumbs.length >= 2
                            ? (function () {
                                  const backBreadCrumb =
                                      breadCrumbs[breadCrumbs.length - 2];
                                  if (!backBreadCrumb.href) return null;
                                  return (
                                      <Link
                                          href={backBreadCrumb.href}
                                          as={backBreadCrumb.as}
                                      >
                                          <a>
                                              <IconButton
                                                  size="small"
                                                  aria-label="Back"
                                              >
                                                  <ArrowBackIosIcon color="inherit" />
                                              </IconButton>
                                          </a>
                                      </Link>
                                  );
                              })()
                            : null}
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
                <div className="logo-box">
                    <WordLogoSVG width="60px" />
                </div>
                <AppNavigation />
            </Drawer>

            <main {...mainContainerProps}>{children}</main>
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
                    background-color: var(--background-dark);
                    display: flex;
                    align-items: center;
                }

                .main-footer {
                    padding: 2vw;
                    z-index: 8;
                }
            `}</style>
        </div>
    );
};

export default MobileAppLayout;

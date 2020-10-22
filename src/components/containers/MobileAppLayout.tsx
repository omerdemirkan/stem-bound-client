import { IAppLayoutProps } from "./AppLayout";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useEffect, useRef, useState } from "react";
import AppNavigation from "./AppNavigation";
import Drawer from "@material-ui/core/Drawer";
import WordLogoSVG from "../svg/icons/word-logo";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { IBreadCrumb } from "../../utils/types";
import Box from "@material-ui/core/Box";
import useDimensions from "../hooks/useDimensions";

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
}) => {
    const classes = useStyles();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    const [headerAppbarRef, headerDimensions] = useDimensions();
    const [footerAppbarRef, footerDimensions] = useDimensions();

    console.log({
        paddingTop: headerDimensions?.height
            ? headerDimensions?.height + "px"
            : undefined,
        paddingBottom: footerDimensions?.height
            ? footerDimensions?.height + "px"
            : undefined,
    });

    return (
        <div
            className="root"
            style={{
                paddingTop: headerDimensions?.height
                    ? headerDimensions?.height + "px"
                    : undefined,
                paddingBottom: footerDimensions?.height
                    ? footerDimensions?.height + "px"
                    : undefined,
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
                                              <IconButton size="small">
                                                  <ArrowBackIosIcon color="inherit" />
                                              </IconButton>
                                          </a>
                                      </Link>
                                  );
                              })()
                            : null}
                        {paginateBreadcrumbs(breadCrumbs)}
                    </header>
                    <IconButton color="inherit" onClick={toggleSidebar}>
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

            <main>{children}</main>
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
                    height: 100vh;
                }
                .root > main {
                    padding: 5vw;
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

function paginateBreadcrumbs(breadCrumbs: IBreadCrumb[]) {
    if (!breadCrumbs) return null;

    let elements = [];

    if (breadCrumbs.length >= 3) {
        elements.push(<span key="dots">...</span>);
    }

    let element;
    let elementKey;

    // Top two breadcrumbs
    const renderedBreadCrumbs = breadCrumbs.slice(
        Math.max(breadCrumbs.length - 2, 0),
        breadCrumbs.length
    );

    renderedBreadCrumbs.forEach(function (breadCrumb, index) {
        elementKey = breadCrumb.label + breadCrumb.href;
        element = (
            <Typography
                variant={breadCrumbs.length === 1 ? "h6" : "subtitle1"}
                color={
                    index === breadCrumbs.length - 1
                        ? "textPrimary"
                        : "textSecondary"
                }
                key={elementKey}
                style={{ margin: "0" }}
            >
                <Box letterSpacing={0}>{breadCrumb.label}</Box>
            </Typography>
        );
        if (breadCrumb.href)
            element = (
                <Link
                    href={breadCrumb.href}
                    as={breadCrumb.as}
                    key={elementKey}
                    shallow={breadCrumb.shallow}
                >
                    {element}
                </Link>
            );

        elements.push(element);
    });
    return <Breadcrumbs>{elements}</Breadcrumbs>;
}

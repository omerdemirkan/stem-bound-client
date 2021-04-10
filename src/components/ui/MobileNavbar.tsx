import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import Link from "next/link";
import { EUserRoles } from "../../utils/types";

import Button from "@material-ui/core/Button";
import WordLogoSVG from "../svg/icons/word-logo";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";
import { staticNavigationData } from "../../utils/constants";

const useStyles = makeStyles({
    navButton: {
        paddingTop: "16px",
        paddingBottom: "16px",
    },
    highlightButton: {
        margin: "4px 0",
    },
});

const MobileNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const classes = useStyles();

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    return (
        <>
            <div className="mobile-navbar-wrapper">
                <Link href="/">
                    <a>
                        <WordLogoSVG height="60px" width="180px" />
                    </a>
                </Link>
                <IconButton color="primary" onClick={toggleMenu}>
                    <MenuIcon />
                </IconButton>

                <div
                    className={`list-wrapper ${
                        isMenuOpen ? "active" : ""
                    }`.trim()}
                >
                    <div className="mobile-navbar-wrapper">
                        <Link href="/">
                            <a>
                                <WordLogoSVG height="60px" width="180px" />
                            </a>
                        </Link>
                        <IconButton color="primary" onClick={toggleMenu}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className="list">
                        {staticNavigationData.links.map(
                            ({ path, title }, index) => (
                                <>
                                    {index !== 0 && <Divider />}
                                    <Link href={path} key={title + path}>
                                        <a>
                                            <Button
                                                onClick={toggleMenu}
                                                className={classes.navButton}
                                                fullWidth
                                            >
                                                {title}
                                            </Button>
                                        </a>
                                    </Link>
                                </>
                            )
                        )}
                        {staticNavigationData.buttons.map(
                            ({ path, title, variant }) => (
                                <Link href={path} key={title + path}>
                                    <Button
                                        onClick={toggleMenu}
                                        className={classes.highlightButton}
                                        fullWidth
                                        variant={variant as any}
                                        color="primary"
                                    >
                                        {title}
                                    </Button>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .mobile-navbar-wrapper {
                    display: flex;
                    justify-content: space-between;
                    padding: 0 35px 0 20px;
                }
                .list-wrapper {
                    position: fixed;
                    height: 100vh;
                    width: 100vw;
                    top: -100%;
                    left: 0;
                    background-color: white;
                    z-index: 1000;
                }
                .list-wrapper.active {
                    top: 0;
                }
                .list-wrapper ul {
                    list-style-type: none;
                }
                .list {
                    padding: 0 16px;
                }

                button {
                    padding-top: 30px;
                    padding-bottom: 30px;
                }
            `}</style>
        </>
    );
};

export default MobileNavbar;

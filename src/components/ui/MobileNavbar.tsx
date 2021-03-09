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
                        <Link href="/our-team">
                            <a>
                                <Button
                                    onClick={toggleMenu}
                                    className={classes.navButton}
                                    fullWidth
                                    variant="text"
                                >
                                    our team
                                </Button>
                            </a>
                        </Link>
                        <Divider />
                        <Link href={`/search?q=${EUserRoles.INSTRUCTOR}`}>
                            <a>
                                <Button
                                    onClick={toggleMenu}
                                    className={classes.navButton}
                                    fullWidth
                                >
                                    search
                                </Button>
                            </a>
                        </Link>
                        <Divider />
                        <Link href="/log-in">
                            <a>
                                <Button
                                    onClick={toggleMenu}
                                    className={classes.navButton}
                                    fullWidth
                                >
                                    log in
                                </Button>
                            </a>
                        </Link>
                        <Divider />
                        <Link href="/sign-up">
                            <a>
                                <Button
                                    onClick={toggleMenu}
                                    className={classes.navButton}
                                    fullWidth
                                >
                                    sign up
                                </Button>
                            </a>
                        </Link>
                        <Link href="/sign-up">
                            <Button
                                onClick={toggleMenu}
                                className={classes.highlightButton}
                                fullWidth
                                variant="outlined"
                                color="primary"
                            >
                                donate
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button
                                onClick={toggleMenu}
                                className={classes.highlightButton}
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                volunteer
                            </Button>
                        </Link>
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

import Link from "next/link";
import { EUserRoles } from "../../utils/types";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import WordLogoSVG from "../svg/icons/word-logo";
import { useState } from "react";
const DesktopNavbar = () => {
    const [navState, chageNavState] = useState({
        activeObject: { id: 0, title: "about us", path: "/" },
        objects: [
            { id: 0, title: "about us", path: "/" },
            { id: 1, title: "our team", path: "/our-team" },
            {
                id: 2,
                title: "search",
                path: `/search?q=${EUserRoles.INSTRUCTOR}`,
            },
            { id: 3, title: "log in", path: "/log-in" },
            { id: 4, title: "sing up", path: "/sign-up" },
        ],
    });

    const toggleActive = (index) => {
        chageNavState({ ...navState, activeObject: navState.objects[index] });
    };
    const toggleActiveStyle = (index) => {
        if (navState.objects[index] === navState.activeObject) {
            return "primary";
        } else {
            return "inherit";
        }
    };

    const { innerHeight: height } = window;
    const scrollToRef = () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    return (
        <div className="desktop-wrapper">
            <Link href="/">
                <a>
                    <WordLogoSVG height="80px" width="180px" />
                </a>
            </Link>

            <div className="page-nav-container">
                {navState.objects.map((el, index) => {
                    return (
                        <Link href={el.path}>
                            <a
                                onClick={() => {
                                    toggleActive(index);
                                    el.id === 0 && scrollToRef();
                                }}
                            >
                                <Typography color={toggleActiveStyle(index)}>
                                    {el.title}
                                </Typography>
                            </a>
                        </Link>
                    );
                })}

                <Link href="/sign-up">
                    <Button variant="outlined" color="primary">
                        Donate
                    </Button>
                </Link>
                <Link href="/volunteer-page">
                    <Button variant="contained" color="primary">
                        Volunteer
                    </Button>
                </Link>
            </div>

            <style jsx>
                {`
                    .desktop-wrapper {
                        display: flex;
                        justify-content: space-between;
                        padding: 0 40px;
                    }
                    .page-nav-container {
                        width: 800px;
                        max-width: 70%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                `}
            </style>
        </div>
    );
};

export default DesktopNavbar;

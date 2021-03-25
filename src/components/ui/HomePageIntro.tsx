import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles({
    highlightButton: {
        margin: "4px 0",
        width: "40%",
    },
});

const HomePageIntro = () => {
    const mobileSize = useMediaQuery("(max-width: 900px)");
    const classes = useStyles();

    return (
        <>
            <div className="intro-section">
                <div className="intro-content-wrapper">
                    <div className="intro-content-container">
                        <div className="big-tittle-container">
                            <h1 className="main-title">
                                Help{" "}
                                <a className="emphasise-content">Connect</a>{" "}
                                Students to{" "}
                                <a className="emphasise-content">
                                    Opportunites
                                </a>
                            </h1>
                        </div>

                        <div className="intro-paragraph-container">
                            <Typography variant="body1" component="p">
                                <Box fontSize={20}>
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Saepe nam vero nisi aut
                                    rem doloremque temporibus adipisci omnis
                                    quae eaque animi ipsam hic voluptatum autem
                                    rerum fugit, quidem, voluptatem minima.
                                </Box>
                            </Typography>
                        </div>

                        <div className="btn-container">
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.highlightButton}
                            >
                                Learn More
                            </Button>

                            <Link href="/sign-up">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.highlightButton}
                                >
                                    SIGN UP
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="section-img-wrapper">
                    <img
                        id="section-img"
                        src="section-img.svg"
                        alt="section-img"
                    />
                </div>
            </div>
            <style jsx>{`
                .intro-section {
                    display: flex;
                    flex-wrap: wrap-reverse;
                    align-items: start;
                    min-height: 100vh;
                }
                .intro-content-wrapper {
                    display: flex;
                    width: 60%;
                    flex-wrap: wrap;
                    margin: 0 auto;
                    height: 100%;
                    padding: 0 10%;
                }
                .intro-content-container {
                    margin: 0 auto;
                }
                .big-tittle-container {
                    height: fit-content;
                    width: 100%;
                    max-width: 700px;
                    margin: 83px auto 0 auto;
                }
                .main-title {
                    font-style: normal;
                    font-weight: 300;
                    font-size: 72px;
                    margin: 0;
                    text-align: left;
                }
                .emphasise-content {
                    color: #826efd;
                    pointer-events: none;
                }

                .intro-paragraph-container {
                    height: fit-content;
                    width: 100%;
                    max-width: 700px;
                    margin: 63px auto 0 auto;
                }
                .btn-container {
                    height: fit-content;
                    width: 100%;
                    max-width: 700px;
                    margin: 63px auto 0 auto;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                .section-img-wrapper {
                    margin: 0;
                    width: 40%;
                    position: relative;
                    min-height: 100vh;
                    margin: 0 auto;
                }
                #section-img {
                    position: absolute;
                    top: -2%;
                    right: 0;
                }

                @media (max-width: 900px) {
                    .intro-content-wrapper {
                        width: 100%;
                        min-height: 60vh;
                    }
                    .main-title {
                        font-size: 40px;
                        line-height: 69px;
                    }
                    .section-img-wrapper {
                        width: 100%;
                        position: relative;
                        display: block;
                        margin: 0 0 4% 0;
                    }

                    #section-img {
                        position: absolute;
                        top: 0;
                        right: 0;
                        height: auto;
                        top: 0;
                        right: 0;
                    }
                }
            `}</style>
        </>
    );
};

export default HomePageIntro;

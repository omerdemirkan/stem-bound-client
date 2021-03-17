import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles({
    btnStyle: {
        margin: "4px 0",
    },
});

const HomePageAppDetail = () => {
    const mobileSize = useMediaQuery("(max-width: 900px)");
    const classes = useStyles();

    return (
        <>
            <div className="detail-section-wrapper">
                <div className="img-wrapper">
                    <img src="home-page-detail-img.svg" alt="" />
                </div>

                <div className="detail-section-content-wrapper">
                    <div className="detail-section-content-container">
                        <div className="title-container">
                            <Typography
                                variant="h1"
                                component="h1"
                                color="primary"
                            >
                                <Box
                                    fontSize={mobileSize ? 45 : 60}
                                    fontWeight="fontWeightLight"
                                >
                                    One Title Here
                                </Box>
                            </Typography>
                        </div>

                        <div className="paragraph-container">
                            <Typography component="p">
                                <Box
                                    lineHeight={1.5}
                                    fontSize={mobileSize ? 17 : 20}
                                >
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Saepe nam vero nisi aut
                                    rem doloremque temporibus adipisci omnis
                                    quae eaque animi ipsam hic voluptatum autem
                                    rerum fugit, quidem, voluptatem minima.
                                </Box>
                            </Typography>
                            <br></br>
                            <Typography variant="body1" component="p">
                                <Box
                                    lineHeight={1.5}
                                    fontSize={mobileSize ? 17 : 20}
                                >
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Saepe nam vero nisi aut
                                    rem doloremque temporibus adipisci omnis
                                    quae eaque animi ipsam hic voluptatum autem
                                    rerum fugit, quidem, voluptatem minima.
                                </Box>
                            </Typography>
                        </div>

                        <div className="btn-container">
                            <Link href="/sign-up">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                >
                                    <Box
                                        fontSize={20}
                                        fontWeight="fontWeightBold"
                                    >
                                        SIGN UP
                                    </Box>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .detail-section-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: start;
                    height: fit-content;
                    min-height: 100vh;
                    min-width: 100%;
                }

                .img-wrapper {
                    width: 45%;
                    height: 100vh;
                    align-items: center;
                    display: flex;
                }
                img {
                    margin: auto;
                }
                .detail-section-content-wrapper {
                    display: flex;
                    width: 55%;
                    flex-wrap: wrap;
                    margin: 0 auto;
                    min-height: 100vh;
                    padding: 0 10%;
                    align-items: center;
                }
                .detail-section-content-container {
                    margin: 0 auto;
                    width: 100%;
                    max-width: 700px;
                }
                .title-container {
                    margin: 0 auto 5% auto;
                }

                .paragraph-container {
                    margin: 0 auto 5% auto;
                }

                @media (max-width: 900px) {
                    .img-wrapper {
                        width: 100%;
                        height: 50vh;
                    }
                    .detail-section-content-wrapper {
                        width: 100%;
                        margin: 0 0 60px 0;
                        max-height: 50vh;
                    }
                }
            `}</style>
        </>
    );
};

export default HomePageAppDetail;

import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const HomePageInfo = () => {
    return (
        <>
            <div className="info-section">
                <div className="info-section-wrapper">
                    <div className="info-container">
                        <img className="icons" src="guide-icon.svg" alt="" />
                        <Typography
                            variant="body1"
                            component="h6"
                            color="primary"
                        >
                            <Box fontSize={25} fontWeight={500} lineHeight={2}>
                                Guiding Youth
                            </Box>
                        </Typography>
                        <Typography variant="body1" component="p">
                            <Box fontSize={17}>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Saepe nam vero nisi aut rem
                                doloremque temporibus adipisci omnis quae eaque
                                animi ipsam hic voluptatum autem rerum fugit,
                                quidem, voluptatem minima.
                            </Box>
                        </Typography>
                    </div>
                    <div className="info-container">
                        <img
                            className="icons"
                            src="instructor-icon.svg"
                            alt=""
                        />
                        <Typography
                            variant="body1"
                            component="h6"
                            color="primary"
                        >
                            <Box fontSize={25} fontWeight={500} lineHeight={2}>
                                Top Instructors
                            </Box>
                        </Typography>
                        <Typography variant="body1" component="p">
                            <Box fontSize={17}>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Saepe nam vero nisi aut rem
                                doloremque temporibus adipisci omnis quae eaque
                                animi ipsam hic voluptatum autem rerum fugit,
                                quidem, voluptatem minima.
                            </Box>
                        </Typography>
                    </div>
                    <div className="info-container">
                        <img className="icons" src="progress-icon.svg" alt="" />
                        <Typography
                            variant="body1"
                            component="h6"
                            color="primary"
                        >
                            <Box fontSize={25} fontWeight={500} lineHeight={2}>
                                Teaching New Skills{" "}
                            </Box>
                        </Typography>
                        <Typography variant="body1" component="p">
                            <Box fontSize={17}>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Saepe nam vero nisi aut rem
                                doloremque temporibus adipisci omnis quae eaque
                                animi ipsam hic voluptatum autem rerum fugit,
                                quidem, voluptatem minima.
                            </Box>
                        </Typography>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .info-section {
                    width: 100%;
                    min-height: 50vh;
                    display: flex;
                    flex-wrap: wrap;
                }
                .info-section-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin: 0 auto;
                    width: 90%;
                }
                .info-container {
                    max-width: 350px;
                    margin: 0 auto;
                }
                .icons {
                    margin: 50px 0 0 0;
                }
                @media (max-width: 900px) {
                    .info-section {
                        margin: 50px 0;
                    }
                }
            `}</style>
        </>
    );
};

export default HomePageInfo;

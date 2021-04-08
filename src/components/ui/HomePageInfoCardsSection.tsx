import Typography from "@material-ui/core/Typography";

const HomePageInfoCardsSection: React.FC = () => {
    return (
        <>
            <div className="info-section">
                <div className="info-section-wrapper">
                    <div className="info-container">
                        <img className="icons" src="guide-icon.svg" alt="" />
                        <Typography variant="h5" color="primary" gutterBottom>
                            Guiding Youth
                        </Typography>
                        <Typography variant="body1" component="p">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Saepe nam vero nisi aut rem doloremque
                            temporibus adipisci omnis quae eaque animi ipsam hic
                            voluptatum autem rerum fugit, quidem, voluptatem
                            minima.
                        </Typography>
                    </div>
                    <div className="info-container">
                        <img
                            className="icons"
                            src="instructor-icon.svg"
                            alt=""
                        />
                        <Typography variant="h5" color="primary" gutterBottom>
                            Top Instructors
                        </Typography>
                        <Typography variant="body1" component="p">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Saepe nam vero nisi aut rem doloremque
                            temporibus adipisci omnis quae eaque animi ipsam hic
                            voluptatum autem rerum fugit, quidem, voluptatem
                            minima.
                        </Typography>
                    </div>
                    <div className="info-container">
                        <img className="icons" src="progress-icon.svg" alt="" />
                        <Typography variant="h5" color="primary" gutterBottom>
                            Teaching New Skills
                        </Typography>
                        <Typography variant="body1" component="p">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Saepe nam vero nisi aut rem doloremque
                            temporibus adipisci omnis quae eaque animi ipsam hic
                            voluptatum autem rerum fugit, quidem, voluptatem
                            minima.
                        </Typography>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .info-section {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    padding-bottom: 10vh;
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
                    margin: 20px auto;
                }
                .icons {
                    margin: 20px 0;
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

export default HomePageInfoCardsSection;

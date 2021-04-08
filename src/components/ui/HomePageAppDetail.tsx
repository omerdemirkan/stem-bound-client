import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "next/link";

const HomePageAppDetail: React.FC = () => {
    return (
        <>
            <div className="app-detail-container">
                <div className="image-section">
                    <img src="home-page-detail-img.svg" alt="" />
                </div>

                <div className="text-section">
                    <div>
                        <Typography variant="h2" color="primary">
                            One Title Here
                        </Typography>

                        <Typography paragraph>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Saepe nam vero nisi aut rem doloremque
                            temporibus adipisci omnis quae eaque animi ipsam hic
                            voluptatum autem rerum fugit, quidem, voluptatem
                            minima.
                        </Typography>
                        <Typography paragraph>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Saepe nam vero nisi aut rem doloremque
                            temporibus adipisci omnis quae eaque animi ipsam hic
                            voluptatum autem rerum fugit, quidem, voluptatem
                            minima.
                        </Typography>

                        <Link href="/sign-up">
                            <a>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                >
                                    SIGN UP
                                </Button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .app-detail-container {
                    display: flex;
                    justify-content: space-evenly;
                    padding: 25vh 0;
                    align-items: center;
                }
                .image-section {
                    max-width: 550px;
                }
                .text-section {
                    max-width: 600px;
                }
            `}</style>
        </>
    );
};

export default HomePageAppDetail;

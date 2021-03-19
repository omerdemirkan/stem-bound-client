import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "next/link";
const VolunteerOption = (props) => {
    return (
        <>
            <div className="component-wrapper">
                <div className="img-container">
                    <img src={props.imgUrl} alt="option-img" />
                </div>

                <div className="title-container">
                    <Typography variant="h5" component="h6" color="primary">
                        <Box fontWeight={500}>{props.title}</Box>
                    </Typography>
                </div>

                <div className="description-container">
                    <Typography variant="body1" component="p">
                        <Box fontSize={17}>{props.description}</Box>
                    </Typography>
                </div>

                <div className="btn-container">
                    <Link href={props.pathToNextPage}>
                        {props.id % 2 === 0 ? (
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                            >
                                GET STARTED
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                GET STARTED
                            </Button>
                        )}
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .component-wrapper {
                    width: 40%;
                    margin: 0 auto 40px auto;
                    height: fit-content;
                }
                .img-container {
                    margin: 3% auto;
                }
                img {
                    margin: 0 auto;
                }
                .title-container {
                    margin: 3% auto;
                }
                .description-container {
                    text-align: left;
                    margin: 3% auto;
                }

                @media (max-width: 900px) {
                    .component-wrapper {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    );
};

export default VolunteerOption;

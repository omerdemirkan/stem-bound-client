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

const TeamCard = (props) => {
    const mobileSize = useMediaQuery("(max-width: 900px)");
    const classes = useStyles();

    return (
        <>
            <div className="staff-info-card-wrapper">
                <div className="img-wrapper">
                    <div className="person-contact-container">
                        <a href="mailto:someone@yoursite.com" target="_blank">
                            <img
                                src="email-icon.svg"
                                alt="email-icon"
                                className="contact-icon"
                            />
                        </a>
                        <a href={props.gitHub} target="_blank">
                            <img
                                src="github-icon.svg"
                                alt="github-icon"
                                className="contact-icon"
                            />
                        </a>
                        <a href={props.linkIn} target="_blank">
                            <img
                                src="linkedin-icon.svg"
                                alt="linkedn-icon"
                                className="contact-icon"
                            />
                        </a>
                    </div>
                </div>
                <Typography variant="h2" component="h1" color="primary">
                    <Box fontSize={30} fontWeight={500} lineHeight={1.5}>
                        {props.name}
                    </Box>
                </Typography>
                <Typography variant="h2" component="h1" color="primary">
                    <Box fontSize={20} lineHeight={1.5}>
                        <p
                            style={{
                                textDecorationLine: "underline",
                                margin: "0",
                            }}
                        >
                            {props.position}
                        </p>
                    </Box>
                </Typography>
                <Typography variant="body1" component="p">
                    <Box fontSize={20} lineHeight={1.5}>
                        {props.bio}
                    </Box>
                </Typography>
            </div>
            <style jsx>{`
                .staff-info-card-wrapper {
                    min-width: 300px;
                    max-width: 30%;
                    margin: 5% auto;
                    text-align: left;
                }

                .img-wrapper {
                    background-image: url(${`${props.imgUrl}`});
                    background-size: cover;
                    width: 250px;
                    height: 250px;
                    align-items: center;
                    text-align: center;
                }

                .person-contact-container {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    text-align: center;
                    justify-content: space-evenly;
                    background: rgba(157, 141, 254, 0.74);
                    border-radius: 25px;
                }

                .contact-icon {
                    margin: 5px;
                    width: 40px;
                    height: 40px;
                }
                .contact-icon:hover {
                    cursor: pointer;
                    width: 45px;
                    height: 45px;
                }
            `}</style>
        </>
    );
};

export default TeamCard;

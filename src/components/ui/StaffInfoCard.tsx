import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export interface IStaffInfoCard {
    github: string;
    linkedin: string;
    name: string;
    position: string;
    bio: string;
    imgUrl: string;
    email: string;
}

const StaffInfoCard: React.FC<IStaffInfoCard> = ({
    github,
    linkedin,
    name,
    position,
    bio,
    imgUrl,
    email,
}) => {
    return (
        <>
            <div className="staff-info-card-wrapper">
                <div className="img-wrapper">
                    <div className="person-contact-container">
                        <a href={`mailto:${email}`} target="_blank">
                            <img
                                src="email-icon.svg"
                                alt="email-icon"
                                className="contact-icon"
                            />
                        </a>
                        <a href={github} target="_blank">
                            <img
                                src="github-icon.svg"
                                alt="github-icon"
                                className="contact-icon"
                            />
                        </a>
                        <a href={linkedin} target="_blank">
                            <img
                                src="linkedin-icon.svg"
                                alt="linkedn-icon"
                                className="contact-icon"
                            />
                        </a>
                    </div>
                </div>
                <Typography variant="h5" component="h1">
                    {name}
                </Typography>
                <Typography
                    variant="h6"
                    component="h2"
                    color="primary"
                    gutterBottom
                >
                    {position}
                </Typography>
                <Typography paragraph>{bio}</Typography>
            </div>
            <style jsx>{`
                .staff-info-card-wrapper {
                    width: 450px;
                    padding: 20px;
                    max-width: 100%;
                    margin: 5% auto;
                }

                .img-wrapper {
                    background-image: url(${imgUrl});
                    background-size: cover;
                    width: 180px;
                    height: 180px;
                    align-items: center;
                    text-align: center;
                    border-radius: 14px;
                    margin: 0 auto 20px;
                    overflow: hidden;
                    -webkit-box-shadow: 2px 2px 12px 5px rgba(0, 0, 0, 0.08);
                    box-shadow: 2px 2px 12px 5px rgba(0, 0, 0, 0.08);
                }

                .person-contact-container {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                    background: rgba(255, 255, 255, 0.8);
                    transition: opacity 0.1s ease;
                    opacity: 0;
                }

                .img-wrapper:hover .person-contact-container {
                    opacity: 1;
                }

                .contact-icon {
                    margin: 5px;
                    width: 30px;
                    height: 30px;
                    transition: 0.1s ease;
                }
                .contact-icon:hover {
                    cursor: pointer;
                    width: 35px;
                    height: 35px;
                }
                @media (hover: none) and (pointer: coarse) {
                    .person-contact-container {
                        opacity: 1;
                    }
                }
            `}</style>
        </>
    );
};

export default StaffInfoCard;

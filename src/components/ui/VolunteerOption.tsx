import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Link from "next/link";

export interface IVolunteerOptionProps {
    imgUrl: string;
    title: string;
    description: string;
    path: string;
    buttonText?: string;
    ButtonProps?: ButtonProps;
}

const VolunteerOption: React.FC<IVolunteerOptionProps> = ({
    title,
    imgUrl,
    description,
    path,
    buttonText,
    ButtonProps,
}) => {
    return (
        <>
            <div className="component-wrapper">
                <div className="img-container">
                    <img src={imgUrl} alt="option-img" />
                </div>

                <div className="title-container">
                    <Typography variant="h5" component="h6" color="primary">
                        <Box fontWeight={500}>{title}</Box>
                    </Typography>
                </div>

                <div className="description-container">
                    <Typography variant="body1" component="p">
                        <Box fontSize={17}>{description}</Box>
                    </Typography>
                </div>

                <Link href={path}>
                    <a>
                        <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            className="spaced-verticle"
                            {...ButtonProps}
                        >
                            {buttonText || "Get Started"}
                        </Button>
                    </a>
                </Link>
            </div>

            <style jsx>{`
                .component-wrapper {
                    width: 100%;
                    max-width: 450px;
                    padding: 40px 20px;
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

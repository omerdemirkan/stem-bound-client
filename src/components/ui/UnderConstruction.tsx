import Typography from "@material-ui/core/Typography";
import UnderConstructionSVG from "../svg/illustrations/under-construction";

const UnderConstruction: React.FC = () => {
    return (
        <div className="root">
            <div className="image-container">
                <UnderConstructionSVG width="100%" />
            </div>
            <Typography align="center" variant="h6" color="textSecondary">
                Under Construction
            </Typography>

            <style jsx>{`
                .root {
                    padding-top: 6vw;
                }
                .image-container {
                    width: 90%;
                    max-width: 300px;
                    margin: auto;
                }
            `}</style>
        </div>
    );
};

export default UnderConstruction;

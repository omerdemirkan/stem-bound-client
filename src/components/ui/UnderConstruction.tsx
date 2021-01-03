import UnderConstructionSVG from "../svg/illustrations/under-construction";
import PictureMessage from "./PictureMessage";

const UnderConstruction: React.FC = () => {
    return (
        <PictureMessage
            Svg={UnderConstructionSVG}
            message="Under Construction"
        />
    );
};

export default UnderConstruction;

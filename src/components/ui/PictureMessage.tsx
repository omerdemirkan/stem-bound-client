import Typography from "@material-ui/core/Typography";
import { Size } from "../../utils/types";

export interface IPictureMessageProps {
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    message?: string;
    subMessage?: string;
    size?: Size;
    footerEl?: any;
}

function mapSizeToWidth(size: Size): string {
    switch (size) {
        case "xs":
            return "100px";
        case "sm":
            return "180px";
        case "md":
            return "260px";
        case "lg":
            return "340px";
        case "xl":
            return "420px";
        default:
            return "260px";
    }
}

function mapSizeToMargin(size: Size): string {
    switch (size) {
        case "xs":
            return "4vh auto";
        case "sm":
            return "6vh auto";
        case "md":
            return "10vh auto";
        case "lg":
            return "14vh auto";
        case "xl":
            return "18vh auto";
        default:
            return "10vh auto";
    }
}

const PictureMessage: React.FC<IPictureMessageProps> = ({
    Svg,
    message,
    size,
    footerEl,
    subMessage,
}) => {
    const pxLimit = mapSizeToWidth(size);
    return (
        <div className="root">
            <Svg width={pxLimit} height={pxLimit} />
            <Typography
                variant="h5"
                color="textPrimary"
                align="center"
                gutterBottom
            >
                {message}
            </Typography>
            {subMessage ? (
                <Typography paragraph color="textSecondary" align="center">
                    {subMessage}
                </Typography>
            ) : null}
            {footerEl ? <div>{footerEl}</div> : null}
            <style jsx>{`
                div.root {
                    width: 95%;
                    max-width: 400px;
                    margin: 25px auto;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default PictureMessage;

import Typography from "@material-ui/core/Typography";
import { Size } from "../../utils/types";

export interface IPictureMessageProps {
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    message?: string;
    subMessage?: string;
    size?: Size;
    footer?: any;
}

function mapSizeToWidth(size: Size): string {
    switch (size) {
        case "xs":
            return "200px";
        case "sm":
            return "280px";
        case "md":
            return "360px";
        case "lg":
            return "440px";
        case "xl":
            return "520px";
        default:
            return "360px";
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
    footer,
    subMessage,
}) => {
    return (
        <div className="root">
            <Svg width="100%" />
            <Typography
                variant="h6"
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
            {footer ? <div>{footer}</div> : null}
            <style jsx>{`
                div.root {
                    width: 95%;
                    max-width: ${mapSizeToWidth(size)};
                    margin: ${mapSizeToMargin(size)};
                }
            `}</style>
        </div>
    );
};

export default PictureMessage;

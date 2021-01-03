import Typography from "@material-ui/core/Typography";

type Size = "large" | "medium" | "small";

interface Props {
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    message: string;
    size?: Size;
    footer?: any;
}

function mapSizeToWidth(size: Size): string {
    switch (size) {
        case "large":
            return "450px";
        case "medium":
            return "350px";
        case "small":
            return "300px";
        default:
            return "350px";
    }
}

function mapSizeToMargin(size: Size): string {
    switch (size) {
        case "large":
            return "15vh auto";
        case "medium":
            return "12vh auto";
        case "small":
            return "8vh auto";
        default:
            return "10vh auto";
    }
}

const PictureMessage: React.FC<Props> = ({ Svg, message, size, footer }) => {
    return (
        <div className="root">
            <Svg width="100%" />
            <Typography variant="h6" color="textSecondary" align="center">
                {message}
            </Typography>
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

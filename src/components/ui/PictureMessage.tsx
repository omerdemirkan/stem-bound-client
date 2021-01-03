import Typography from "@material-ui/core/Typography";

interface Props {
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    message: string;
    size?: "large" | "medium" | "small";
}

function mapSizeToWidth(size: "large" | "medium" | "small") {
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

const PictureMessage: React.FC<Props> = ({ Svg, message, size }) => {
    return (
        <div className="root">
            <Svg width="100%" />
            <Typography variant="h6" color="textSecondary" align="center">
                {message}
            </Typography>
            <style jsx>{`
                div.root {
                    width: 95%;
                    max-width: ${mapSizeToWidth(size)};
                    margin: auto;
                }
            `}</style>
        </div>
    );
};

export default PictureMessage;

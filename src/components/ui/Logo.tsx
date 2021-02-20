import { ETheme } from "../../utils/types";
import WordLogoSVG from "../svg/icons/word-logo";
import WordLogoDarkModeSVG from "../svg/icons/word-logo-dark-mode";
import LogoSVG from "../svg/icons/logo";
import Typography from "@material-ui/core/Typography";
import Box, { BoxProps } from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    beta: {
        lineHeight: 0,
        fontSize: ".8rem",
        fontWeight: 500,
        textAlign: "end",
        opacity: 0.6,
        position: "relative",
        bottom: "8px",
    },
});

export interface ILogoProps extends BoxProps {
    theme?: ETheme;
    type?: "word" | "icon";
    beta?: boolean;
    SvgProps?: React.SVGProps<SVGSVGElement>;
}

const Logo: React.FC<ILogoProps> = ({
    theme,
    type,
    beta,
    SvgProps,
    ...boxProps
}) => {
    const classes = useStyles();
    const SvgComponent =
        type === "word"
            ? theme === ETheme.DARK
                ? WordLogoDarkModeSVG
                : WordLogoSVG
            : LogoSVG;
    return (
        <Box component="div" {...boxProps}>
            <SvgComponent width="100%" height="auto" {...SvgProps} />
            {beta && (
                <Typography color="textPrimary" className={classes.beta}>
                    BETA
                </Typography>
            )}
        </Box>
    );
};

export default Logo;

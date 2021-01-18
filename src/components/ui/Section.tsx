import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import Box, { BoxProps } from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

type Spacing = number | "xs" | "sm" | "md" | "lg" | "xl";

export interface ISectionProps {
    title?: string;
    action?: any;
    spacing?: Spacing;
    noDivider?: boolean;
    loading?: boolean;
    infoMessage?: string;
    errorMessage?: string;
}

function getSpacingValue(spacing: Spacing) {
    if (!spacing) return 12;
    if (typeof spacing === "number") return spacing;
    switch (spacing) {
        case "xs":
            return 5;
        case "sm":
            return 8;
        case "md":
            return 12;
        case "lg":
            return 16;
        case "xl":
            return 22;
    }
}

const Section: React.FC<ISectionProps & BoxProps> = ({
    title,
    action,
    children,
    spacing,
    noDivider,
    loading,
    infoMessage,
    errorMessage,
    ...boxProps
}) => {
    const spacingValue = getSpacingValue(spacing);
    return (
        <Box
            padding={`${spacingValue}px 0 ${spacingValue}px`}
            alignItems="center"
            {...boxProps}
        >
            {title || action ? (
                <>
                    {!noDivider && <Divider light />}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <ListSubheader
                            style={{
                                padding: "0",
                                position: "relative",
                                lineHeight: `${5 * spacingValue + 10}px`,
                            }}
                        >
                            {title}
                            {loading && (
                                <CircularProgress
                                    style={{ float: "right" }}
                                    size="sm"
                                />
                            )}
                        </ListSubheader>
                        <span>{action}</span>
                    </div>
                </>
            ) : null}
            {children}
            {infoMessage && (
                <Typography paragraph color="textSecondary">
                    {infoMessage}
                </Typography>
            )}
            {errorMessage && (
                <Typography paragraph color="secondary">
                    {errorMessage}
                </Typography>
            )}
        </Box>
    );
};

export default Section;

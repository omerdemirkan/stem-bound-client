import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import Box, { BoxProps } from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

type Spacing = "xs" | "sm" | "md" | "lg" | "xl";

export interface ISectionProps extends BoxProps {
    title?: string;
    action?: any;
    spacing?: Spacing;
    noDivider?: boolean;
    loading?: boolean;
    infoMessage?: string;
    infoHeader?: string;
    infoAction?: any;
    errorMessage?: string;
    errorHeader?: string;
    errorAction?: any;
}

function getBoxPadding(
    spacing: Spacing,
    options: { noDivider?: boolean } = {}
) {
    if (!spacing) return 12;
    switch (spacing) {
        case "xs":
            return `${!options.noDivider ? 5 : 0}px 0 ${5}px`;
        case "sm":
            return `${!options.noDivider ? 8 : 0}px 0 ${8}px`;
        case "md":
            return `${!options.noDivider ? 12 : 0}px 0 ${12}px`;
        case "lg":
            return `${!options.noDivider ? 16 : 0}px 0 ${16}px`;
        case "xl":
            return `${!options.noDivider ? 22 : 0}px 0 ${22}px`;
    }
}

function getListSubheaderLineHeight(spacing: Spacing) {
    switch (spacing) {
        case "xs":
            return `35px`;
        case "sm":
            return `45px`;
        case "md":
            return `55px`;
        case "lg":
            return `65px`;
        case "xl":
            return `75px`;
    }
}

const Section: React.FC<ISectionProps> = ({
    title,
    action,
    children,
    spacing,
    noDivider,
    loading,
    infoHeader,
    infoMessage,
    infoAction,
    errorMessage,
    errorAction,
    errorHeader,
    ...boxProps
}) => {
    spacing = spacing || "md";
    return (
        <Box
            padding={getBoxPadding(spacing, { noDivider })}
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
                                lineHeight: getListSubheaderLineHeight(spacing),
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
            {(infoMessage || infoHeader) && (
                <Alert severity="info" action={infoAction}>
                    {infoHeader ? <AlertTitle>{infoHeader}</AlertTitle> : null}
                    {infoMessage}
                </Alert>
            )}
            {(errorMessage || errorHeader) && (
                <Alert severity="info" action={errorAction}>
                    {errorHeader ? (
                        <AlertTitle>{errorHeader}</AlertTitle>
                    ) : null}
                    {errorMessage}
                </Alert>
            )}
        </Box>
    );
};

export default Section;

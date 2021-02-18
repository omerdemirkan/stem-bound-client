import Box, { BoxProps } from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { Size } from "../../utils/types";
import { SectionHeader } from "./SectionHeader";

export interface ISectionProps extends BoxProps {
    title?: string;
    actionEl?: any;
    spacing?: Size;
    noDivider?: boolean;
    loading?: boolean;
    infoMessage?: string;
    infoHeader?: string;
    infoAction?: any;
    errorMessage?: string;
    errorHeader?: string;
    errorAction?: any;
}

function getBoxPadding(spacing: Size, options: { noDivider?: boolean } = {}) {
    if (!spacing) return 12;
    switch (spacing) {
        case "xs":
            return `2px 0`;
        case "sm":
            return `6px 0`;
        case "md":
            return `10px 0`;
        case "lg":
            return `14px 0`;
        case "xl":
            return `20px 0`;
    }
}

const Section: React.FC<ISectionProps> = ({
    title,
    actionEl,
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
        <Box alignItems="center" padding={getBoxPadding(spacing)} {...boxProps}>
            <SectionHeader
                title={title}
                actionEl={actionEl}
                noDivider={noDivider}
            />

            {children}

            {(infoMessage || infoHeader) && (
                <Alert severity="info" action={infoAction}>
                    {infoHeader ? <AlertTitle>{infoHeader}</AlertTitle> : null}
                    {infoMessage}
                </Alert>
            )}
            {(errorMessage || errorHeader) && (
                <Alert severity="error" action={errorAction}>
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

import Typography from "@material-ui/core/Typography";
import Divider, { DividerProps } from "@material-ui/core/Divider";
import { Size } from "../../utils/types";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";

interface ISectionHeaderProps {
    title: string;
    spacing?: Size;
    actionEl?: any;
    noDivider?: boolean;
    DividerProps?: DividerProps;
    loading?: boolean;
}

function getTitleMargin(spacing: Size) {
    switch (spacing) {
        case "xs":
            return `4px 0`;
        case "sm":
            return `9px 0`;
        case "md":
            return `12px 0`;
        case "lg":
            return `15px 0`;
        case "xl":
            return `18px 0`;
        default:
            return `12px 0`;
    }
}

export const SectionHeader: React.FC<ISectionHeaderProps> = ({
    title,
    spacing,
    actionEl,
    noDivider,
    DividerProps,
    loading,
}) => {
    return (
        <>
            {noDivider !== true &&
                (loading ? (
                    <LinearProgress color="primary" />
                ) : (
                    <Divider light {...DividerProps} />
                ))}
            <div
                className="title-wrapper"
                style={{ margin: getTitleMargin(spacing) }}
            >
                <Typography component="span" color="textSecondary">
                    <Box fontSize=".9rem" fontWeight={500}>
                        {title}
                    </Box>
                </Typography>
                <span>{actionEl}</span>
            </div>

            <style jsx>{`
                .title-wrapper {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            `}</style>
        </>
    );
};

import Typography from "@material-ui/core/Typography";
import Divider, { DividerProps } from "@material-ui/core/Divider";
import { Size } from "../../utils/types";
import Box from "@material-ui/core/Box";

interface ISectionHeaderProps {
    title: string;
    spacing?: Size;
    actionEl?: any;
    noDivider?: boolean;
    DividerProps?: DividerProps;
}

function getTitleMargin(spacing: Size) {
    switch (spacing) {
        case "xs":
            return `6px 0 4px`;
        case "sm":
            return `8px 0 6px`;
        case "md":
            return `10px 0 8px`;
        case "lg":
            return `12px 0 10px`;
        case "xl":
            return `15px 0 12px`;
        default:
            return `10px 0 8px`;
    }
}

export const SectionHeader: React.FC<ISectionHeaderProps> = ({
    title,
    spacing,
    actionEl,
    noDivider,
    DividerProps,
}) => {
    return (
        <>
            {noDivider !== false && <Divider light {...DividerProps} />}
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

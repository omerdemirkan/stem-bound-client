import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import Box, { BoxProps } from "@material-ui/core/Box";

interface Props {
    title?: string;
    action?: any;
    spacing?: number;
    noDivider?: boolean;
}

const Section: React.FC<Props & BoxProps> = ({
    title,
    action,
    children,
    spacing,
    noDivider,
    ...boxProps
}) => {
    spacing = typeof spacing === "number" ? spacing : 10;
    return (
        <Box
            padding={`${spacing}px 0 ${spacing}px`}
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
                                lineHeight: `${5 * spacing + 10}px`,
                            }}
                        >
                            {title}
                        </ListSubheader>
                        <span>{action}</span>
                    </div>
                </>
            ) : null}
            {children}
        </Box>
    );
};

export default Section;

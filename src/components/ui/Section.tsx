import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import Box, { BoxProps } from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

interface Props {
    title?: string;
    action?: any;
    spacing?: number;
    noDivider?: boolean;
    loading?: boolean;
    empty?: boolean;
}

const Section: React.FC<Props & BoxProps> = ({
    title,
    action,
    children,
    spacing,
    noDivider,
    loading,
    empty,
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
            {!loading && empty && (
                <Typography variant="h5" color="textSecondary">
                    No {title} found.
                </Typography>
            )}
        </Box>
    );
};

export default Section;

import Box, { BoxProps } from "@material-ui/core/Box";

const FlexBox: React.FC<BoxProps> = ({ children, ...boxProps }) => {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            {...boxProps}
        >
            {children}
        </Box>
    );
};

export default FlexBox;

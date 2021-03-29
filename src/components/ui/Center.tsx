import Box, { BoxProps } from "@material-ui/core/Box";

export interface ICenterProps extends BoxProps {}

const Center: React.FC<ICenterProps> = ({ children, ...boxProps }) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            {...boxProps}
        >
            {children}
        </Box>
    );
};

export default Center;

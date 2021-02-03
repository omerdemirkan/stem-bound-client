import Box, { BoxProps } from "@material-ui/core/Box";

export type IFlexBoxProps = BoxProps;

const FlexBox: React.FC<IFlexBoxProps> = ({ children, ...boxProps }) => {
    return (
        <Box
            display="flex"
            justifyContent="flex-start"
            flexWrap="wrap"
            {...boxProps}
        >
            {children}
        </Box>
    );
};

export default FlexBox;

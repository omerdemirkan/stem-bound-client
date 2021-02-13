import Box, { BoxProps } from "@material-ui/core/Box";
import { useEffect, useState } from "react";
import useDimensions from "../../hooks/useDimensions";

interface IRelativeGridProps extends BoxProps {
    minWidthInPixels: number;
}

const RelativeGrid: React.FC<IRelativeGridProps> = ({
    children,
    minWidthInPixels,
    ...boxProps
}) => {
    const [boxRef, boxDimensions] = useDimensions();
    const [numColumns, setNumColumns] = useState<number>(1);

    useEffect(
        function () {
            if (!boxDimensions?.width) return;

            const newNumColumns =
                boxDimensions.width > minWidthInPixels
                    ? Math.floor(boxDimensions.width / minWidthInPixels)
                    : 1;
            if (newNumColumns !== numColumns) setNumColumns(newNumColumns);
        },
        [boxDimensions?.width]
    );

    return (
        <Box
            gridGap="10px"
            {...boxProps}
            // @ts-ignore
            ref={boxRef}
            display="grid"
            gridTemplateColumns={`repeat(${numColumns}, minmax(0, 1fr))`}
        >
            {children}
        </Box>
    );
};

export default RelativeGrid;

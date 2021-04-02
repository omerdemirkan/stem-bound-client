import Box, { BoxProps } from "@material-ui/core/Box";
import { useEffect, useState } from "react";
import useDimensions from "../../hooks/useDimensions";

interface IRelativeGridProps extends BoxProps {
    minWidthInPixels: number;
}

// Note: Relative Grid currently has problems
// with pages that are server-side rendered.

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
            component="section"
            // @ts-ignore
            ref={boxRef}
            display="grid"
            gridTemplateColumns={`repeat(${numColumns}, minmax(0, 1fr))`}
            alignItems="start"
            {...boxProps}
        >
            {children}
        </Box>
    );
};

export default RelativeGrid;

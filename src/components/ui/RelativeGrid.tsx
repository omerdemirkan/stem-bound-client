import Box, { BoxProps } from "@material-ui/core/Box";
import { useEffect, useState } from "react";
import useDimensions from "../hooks/useDimensions";

interface IRelativeGridProps extends BoxProps {
    minWidth: number;
}

const RelativeGrid: React.FC<IRelativeGridProps> = ({
    children,
    minWidth,
    ...boxProps
}) => {
    const [boxRef, boxDimensions] = useDimensions();
    const [numColumns, setNumColumns] = useState<number>(1);

    useEffect(
        function () {
            if (!boxDimensions?.width) return;

            const newNumColumns =
                boxDimensions.width > minWidth
                    ? Math.floor(boxDimensions.width / minWidth)
                    : 1;
            if (newNumColumns !== numColumns) setNumColumns(newNumColumns);
        },
        [boxDimensions?.width]
    );

    return (
        <Box
            {...boxProps}
            // @ts-ignore
            ref={boxRef}
            display="grid"
            gridTemplateColumns={new Array(numColumns).fill("auto").join(" ")}
        >
            {children}
        </Box>
    );
};

export default RelativeGrid;

import Box, { BoxProps } from "@material-ui/core/Box";
import { useEffect, useState } from "react";
import useDimensions from "../../hooks/useDimensions";

export interface IRelativeGridProps extends BoxProps {
    gridGap?: string | 0;
    minWidth?: string | 0;
}

export const RelativeGrid: React.FC<IRelativeGridProps> = ({
    children,
    gridGap = 0,
    minWidth = "400px",
}) => {
    return (
        <div className="relative-grid">
            {children}
            <style jsx>{`
                .relative-grid {
                    display: grid;
                    grid-gap: ${gridGap};
                    grid-template-columns: repeat(
                        auto-fill,
                        minmax(${minWidth}, 1fr)
                    );
                }
            `}</style>
        </div>
    );
};

export default RelativeGrid;

interface IRelativeGridDeprecatedProps extends BoxProps {
    minWidthInPixels: number;
}

// Note: This currently has problems
// with pages that are server-side rendered.

export const RelativeGridDeprecated: React.FC<IRelativeGridDeprecatedProps> = ({
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

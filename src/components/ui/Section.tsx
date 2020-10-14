import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props {
    marginLeft?: string;
    marginRight?: string;
    marginBottom?: string;
    marginTop?: string;
    margin?: string;
    divProps?: DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;
    spacing?: number;
}

const Section: React.FC<Props> = ({
    children,
    divProps,
    spacing,
    ...marginProps
}) => {
    spacing = spacing || 5;
    return (
        <div
            style={{
                margin: `${spacing * 2}px 0 ${spacing * 2}px`,
                ...marginProps,
            }}
            {...divProps}
        >
            {children}
        </div>
    );
};

export default Section;

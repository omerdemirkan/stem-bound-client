import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props {
    title?: string;
    action?: any;
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
    title,
    action,
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
            {title || action ? (
                <>
                    <Divider />
                    <ListSubheader>
                        {title} <span style={{ float: "right" }}>{action}</span>
                    </ListSubheader>
                </>
            ) : null}
            {children}
        </div>
    );
};

export default Section;

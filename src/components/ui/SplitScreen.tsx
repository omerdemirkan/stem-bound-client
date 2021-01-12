import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props {
    mainEl: any;
    secondaryEl: any;
    order?: "main-first" | "secondary-first";
    MainContainerProps?: DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;
    SecondaryContainerProps?: DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
    >;
    RootContainerProps?: DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;
}

const SplitScreen: React.FC<Props> = ({
    mainEl,
    secondaryEl,
    order,
    MainContainerProps,
    SecondaryContainerProps,
    RootContainerProps,
}) => {
    return (
        <div className="root-container" {...RootContainerProps}>
            {order === "secondary-first" ? (
                <>
                    <aside
                        className="secondary-container"
                        {...SecondaryContainerProps}
                    >
                        {secondaryEl}
                    </aside>
                    <div className="main-container" {...MainContainerProps}>
                        {mainEl}
                    </div>
                </>
            ) : (
                <>
                    <div className="main-container" {...MainContainerProps}>
                        {mainEl}
                    </div>
                    <aside
                        className="secondary-container"
                        {...SecondaryContainerProps}
                    >
                        {secondaryEl}
                    </aside>
                </>
            )}

            <style jsx>{`
                .root-container {
                    display: grid;
                    grid-template-columns: ${order === "secondary-first"
                        ? "400px auto"
                        : "auto 400px"};
                    grid-gap: 50px;
                }

                @media (max-width: 1400px) {
                    .root-container {
                        grid-template-columns: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default SplitScreen;

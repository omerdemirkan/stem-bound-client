import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props {
    mainEl: any;
    secondaryEl: any;
    MainContainerProps?: DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;
    SecondaryContainerProps?: DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
    >;
}

const SplitScreen: React.FC<Props> = ({
    mainEl,
    secondaryEl,
    MainContainerProps,
    SecondaryContainerProps,
}) => {
    return (
        <div className="root-container">
            <div {...MainContainerProps}>{mainEl}</div>
            <aside {...SecondaryContainerProps}>{secondaryEl}</aside>
            <style jsx>{`
                .root-container {
                    display: grid;
                    grid-template-columns: auto 400px;
                    grid-gap: 50px;
                }

                .root-container > aside {
                    overflow-x: hidden;
                    overflow-y: auto;
                }

                @media (max-width: 1200px) {
                    .root-container {
                        grid-template-columns: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default SplitScreen;

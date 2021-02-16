export interface IActionBarProps {
    float?: "left" | "right";
    startEl?: any;
}

const ActionBar: React.FC<IActionBarProps> = ({ children, float, startEl }) => {
    return (
        <>
            <div className="root">
                <span className="start-container">{startEl}</span>
                <span className="main-container">{children}</span>
            </div>

            <style jsx>{`
                .root {
                    padding: 10px 0 15px;
                }
                @media (min-width: 901px) {
                    .root {
                        display: flex;
                        justify-content: ${float === "left"
                            ? "flex-start"
                            : "space-between"};
                        align-items: center;
                        flex-wrap: wrap;
                    }
                    .main-container > * {
                        margin: 0 10px !important;
                        text-align: end;
                    }
                    .start-container > * {
                        margin-right: 10px !important;
                    }
                }
                @media (max-width: 900px) {
                    .root {
                        display: grid;
                        grid-template-columns: 100%;
                        grid-gap: 15px;
                    }
                }
            `}</style>
        </>
    );
};

export default ActionBar;

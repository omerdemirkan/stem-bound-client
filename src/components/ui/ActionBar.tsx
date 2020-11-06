interface Props {
    float?: "left" | "right";
    startEl?: any;
}

const ActionBar: React.FC<Props> = ({ children, float, startEl }) => {
    return (
        <>
            <div className="root">
                <span className="start-container">{startEl}</span>
                <span className="main-container">{children}</span>
            </div>

            <style jsx>{`
                .root {
                    display: flex;
                    justify-content: ${float === "left"
                        ? "flex-start"
                        : "space-between"};
                    align-items: center;
                    padding: 10px 0 15px;
                    flex-wrap: wrap;
                }
                .main-container > * {
                    margin: 0 10px !important;
                    text-align: end;
                }
                .start-container > * {
                    margin-right: 10px !important;
                }
            `}</style>
        </>
    );
};

export default ActionBar;

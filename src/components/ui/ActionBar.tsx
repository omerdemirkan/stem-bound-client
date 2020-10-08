import Typography from "@material-ui/core/Typography";

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
                    justify-content: ${
                        float === "left" ? "flex-start" : "space-between"
                    };
                    padding: 10px 0 15px;
                }
                .main-container > * {
                    margin-${float === "left" ? "right" : "left"}: 10px;
                }
                .start-container > * {
                    margin-right: 10px;
                }
            `}</style>
        </>
    );
};

export default ActionBar;

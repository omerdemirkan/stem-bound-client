interface Props {
    float?: "left" | "right";
    renderEl?: any;
}

const ActionBar: React.FC<Props> = ({ children, float, renderEl }) => {
    return (
        <>
            <div className="root">
                <span>{renderEl}</span>
                <span className={float === "left" ? undefined : "float-right"}>
                    {children}
                </span>
            </div>

            <style jsx>{`
                .root {
                    display: flex;
                    justify-content: ${float === "left"
                        ? "flex-start"
                        : "space-between"};
                    padding: 15px 0 20px;
                }
                .float-right {
                    float: right;
                }
            `}</style>
        </>
    );
};

export default ActionBar;

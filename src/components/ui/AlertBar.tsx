interface Props {
    type: "info" | "warning" | "success";
    disableClose?: boolean;
    finePrint?: string;
}

const AlertBar: React.FC<Props> = ({ children, finePrint }) => {
    return (
        <div>
            <p>{children}</p>
            <p>{finePrint}</p>
        </div>
    );
};

export default AlertBar;

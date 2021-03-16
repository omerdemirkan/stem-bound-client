import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

export interface IScreenLayoutProps {
    onClose(): void;
    header: string;
    subheader?: string;
    avatar?: any;
    headerActionEl?: any;
    actionEl?: any;
}

const ScreenLayout: React.FC<IScreenLayoutProps> = ({
    children,
    onClose,
    header,
    subheader,
    headerActionEl,
    actionEl,
    avatar,
}) => {
    return (
        <div className="screen-layout">
            <CardHeader
                title={header}
                subheader={subheader}
                avatar={avatar}
                action={
                    <>
                        {headerActionEl}
                        <IconButton onClick={onClose} color="primary">
                            <ClearIcon />
                        </IconButton>
                    </>
                }
            />
            <CardContent>{children}</CardContent>
            {actionEl && <CardActions>{actionEl}</CardActions>}
        </div>
    );
};

export default ScreenLayout;

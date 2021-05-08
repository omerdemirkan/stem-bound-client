import {
    Box,
    ListItemText,
    makeStyles,
    SvgIconTypeMap,
    Typography,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

const useStyles = makeStyles({
    listItem: {
        paddingLeft: "22px",
    },
});

export interface INavigationButtonProps {
    Icon:
        | React.FC<React.SVGProps<SVGSVGElement>>
        | OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    active?: boolean;
    rightEl?: any;
}

const NavigationButton: React.FC<INavigationButtonProps> = ({
    Icon,
    rightEl,
    active,
    children,
}) => {
    const classes = useStyles();
    return (
        <ListItem button className={classes.listItem} selected={active}>
            <ListItemIcon>
                <Icon color={active ? "primary" : undefined} />
            </ListItemIcon>
            <ListItemText
                primary={
                    <Typography component="span" color="textPrimary">
                        <Box
                            fontSize="0.9rem"
                            color={active ? "primary" : undefined}
                        >
                            {children}
                        </Box>
                    </Typography>
                }
            />
            {rightEl}
        </ListItem>
    );
};

export default NavigationButton;

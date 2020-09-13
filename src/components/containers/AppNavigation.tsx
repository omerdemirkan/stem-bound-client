import {
    makeStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import useNavigationData from "../hooks/useNavigationData";
import { useRouter } from "next/router";
import { INavigationDataButton } from "../../utils/types";
import Link from "next/link";

const useStyles = makeStyles({
    listItem: {
        paddingLeft: "40px",
    },
});

const AppNavigation: React.FC = () => {
    const classes = useStyles();
    const navigationData = useNavigationData();
    const router = useRouter();
    return (
        <List component="nav">
            {navigationData?.buttons.map(function ({
                path,
                Icon,
                text,
            }: INavigationDataButton) {
                const selected = path.includes(router.pathname);
                return (
                    <Link href={path} key={path}>
                        <a>
                            <ListItem
                                button
                                className={classes.listItem}
                                selected={selected}
                            >
                                <ListItemIcon>
                                    <Icon
                                        color={selected ? "primary" : undefined}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={text}
                                    color={selected ? "primary" : "secondary"}
                                />
                            </ListItem>
                        </a>
                    </Link>
                );
            })}
        </List>
    );
};

export default AppNavigation;

import { makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import { useRef, useState } from "react";
import Link from "next/link";

const useStyles = makeStyles({
    menu: {
        justifyContent: "flex-end",
    },
});

export interface IMenuItemDTO {
    display: string;
    href?: string;
    as?: string;
}

interface Props {
    menuItems: IMenuItemDTO[];
    MenuItemProps?: MenuItemProps;
}

const MenuWrapper: React.FC<Props> = ({
    children,
    menuItems,
    MenuItemProps,
}) => {
    const divRef = useRef<HTMLDivElement>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const classes = useStyles();
    const toggleIsOpen = () => setIsOpen((prev) => !prev);
    return (
        <>
            <div ref={divRef} onClick={toggleIsOpen}>
                {children}
            </div>
            <Menu
                open={isOpen}
                onClose={toggleIsOpen}
                anchorEl={divRef.current}
                className={classes.menu}
            >
                {menuItems &&
                    menuItems.map((item) =>
                        paginateMenuItem(item, { MenuItemProps })
                    )}
            </Menu>
        </>
    );
};

function paginateMenuItem(
    menuItemData: IMenuItemDTO,
    options?: { MenuItemProps: MenuItemProps }
) {
    let menuItemContent: any = menuItemData.display;
    if (menuItemData.href)
        menuItemContent = (
            <Link href={menuItemData.href} as={menuItemData.as}>
                {menuItemContent}
            </Link>
        );
    const menuItem = (
        // @ts-ignore
        <MenuItem {...options?.MenuItemProps}>{menuItemContent}</MenuItem>
    );
    return menuItem;
}

export default MenuWrapper;

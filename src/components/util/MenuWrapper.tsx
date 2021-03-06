import Menu from "@material-ui/core/Menu";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import { useRef, useState } from "react";
import Link from "next/link";

export interface IMenuItemDTO {
    display: string;
    href?: string;
    as?: string;
    onClick?(): any;
    MenuItemProps?: MenuItemProps;
    visible?: boolean;
}

export interface IMenuWrapperProps {
    menuItems: IMenuItemDTO[];
    MenuItemProps?: MenuItemProps;
}

const MenuWrapper: React.FC<IMenuWrapperProps> = ({
    children,
    menuItems,
    MenuItemProps,
}) => {
    const divRef = useRef<HTMLDivElement>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);
    return (
        <>
            <div ref={divRef} onClick={open} style={{ cursor: "pointer" }}>
                {children}
            </div>
            <Menu
                open={isOpen}
                onClose={close}
                onClick={close}
                anchorEl={divRef.current}
            >
                {menuItems &&
                    menuItems
                        .filter((item) => item.visible !== false)
                        .map((item) =>
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
        <MenuItem
            onClick={menuItemData.onClick}
            key={menuItemData.display}
            {...options?.MenuItemProps}
            {...menuItemData.MenuItemProps}
        >
            {menuItemContent}
        </MenuItem>
    );
    return menuItem;
}

export default MenuWrapper;

export interface Sidebar {
    collapsed: boolean,
    menus: Array<Menu>;
    activeMenu: any,
}

export interface Menu {
    label: string;
    name: string;
    icon: string;
    path: string;
    submenus?: any[];
}
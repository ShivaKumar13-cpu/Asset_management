export interface Menu1 {
    id: number,
    label: string,
    subMenus: {
        id: number;
        subMenuLabel: string;
        selected?: boolean; // Optional
    }[];
}
export interface MenuWithSelection extends Menu {
    selected?: boolean;
}

export interface OrgMenu {
    id: number,
    label: string,
    subMenus: {
        id: number;
        subMenuLabel: string;
    }[];
}
interface SubMenu {
    id: number;
    subMenuLabel: string;
  }
  
  interface Menu {
    id: number;
    label: string;
    subMenus: SubMenu[];
  }
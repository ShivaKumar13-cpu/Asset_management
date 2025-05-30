export interface role{
    
        id: number,
        name: string,
        permissions: [
          {
            id: number,
            roleId: number,
            resourceId: number,
            resourceName: string,
            canCreate: true,
            canView: true,
            canEdit: true,
            canDelete: true
          }
        ],
        extendedPermissions: [
          {
            id: number,
            resourceId: number,
            resourceName: string,
            action: string,
            description: string
          }
        ],
        menus: [
          {
            id: number,
            label: string
          }
        ],
        subMenus: [
          {
            id: number,
            subMenuLabel: string,
            menuId: number
          }
        ],
        departmentId: number,
        userLevelTypeId: number,
        userLevelType:string
      
}
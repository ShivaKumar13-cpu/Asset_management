import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Menu1, OrgMenu } from '../../Model/Class/Access';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessPolicyService {

  http = inject(HttpClient)
  private baseUrl: string
  constructor() {
    this.baseUrl = environment.baseApiURL;
  }

  getRoles(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}users/roles/all`, {});
  }

  getAllMenu(): Observable<OrgMenu[]> {
    return this.http.post<OrgMenu[]>(`${this.baseUrl}users/menus/getAllWithSubMenus`, {});
  }


  getMenuById(id: number): Observable<Menu1> {
    return this.http.post<Menu1>(`${this.baseUrl}users/menus/get-by-id`, { id: id });
  }
  createMenu(menu: Menu1): Observable<Menu1> {
    return this.http.post<Menu1>(`${this.baseUrl}users/menus/create`, menu);
  }
  editMenu(menu: Menu1): Observable<Menu1> {
    return this.http.post<Menu1>(`${this.baseUrl}users/menus/update`, menu);
  }

  getPermissionMaster(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}users/permissions/all`, {});
  }
  getExtendedPermissionMaster(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}users/extended-permissions/get-all`, {});
  }

  getAllResource(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}users/resources/getAll`, {});
  }
  getAllOrgMenu(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}users/menus/getAllWithSubMenus`, {});
  }

  getPermissionsByRoleId(id: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}users/permissions/by-role`, { roleId: id });
  }

  assignPermision(permision: any): Observable<any> {
    return this.http.post<any[]>(`${this.baseUrl}users/roles/assign-permissions`, permision);
  }

  createPermission(permission: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users/permissions/create`, permission);
  }

  updatePermission(permission: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users/permissions/update`, permission);
  }

  getExistingMenuPermissions(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users/permissions/update`, {id : id});
  }

  getAllMenuByRoleId(id: number): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}users/menus/getAllMenusByRoleId`, {id : id});
  }
  getAllSubMenuByRoleId(id: number): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}users/submenus/getAllSubmenusByRoleId`, {id : id});
  }

  updateMenuAndAssign(menu: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}users/roles/assign-menus`, menu);
  }
  updateSubMenuAndAssign(subMenu: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}users/roles/assign-submenus`, subMenu);
  }
}

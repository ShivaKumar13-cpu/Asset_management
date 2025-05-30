import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IMenuItem } from '../../Components/Constants/menu';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  
    http = inject(HttpClient)
    private baseUrl: string
    constructor() {
      this.baseUrl = environment.baseApiURL;
    }

    _filteredMenu = signal<IMenuItem[]>([])

  getAllMenuAccessPolicyBasedOnRole(roleId: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users/menus/getAllMenusAndSubMenusByRoleId`, {id: roleId});
  }

}

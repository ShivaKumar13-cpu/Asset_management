import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  http = inject(HttpClient)
  private baseUrl: string

  constructor() {
    this.baseUrl = environment.baseApiURL;
    console.log(this.baseUrl);

  }

  getAllRoles(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}users/roles/all`, {})

  }

  getRoleById(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users/roles/get-by-id`, { id: id })
  }

  getRoleByDeptId(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users/roles/by-department`, { id: id })
  }

  createRole(role: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users/roles/create`, role)
  }

  editRole(role: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users/roles/update`, role)
  }

  deleteRole(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users/roles/delete`, { id: id })
  }

  getAllRolesByBvId(id: number): Observable<any> {
    console.log('service enters');
    return this.http.post<any>(`${this.baseUrl}users/roles/by-business-vertical`, { id: id })
  }

}

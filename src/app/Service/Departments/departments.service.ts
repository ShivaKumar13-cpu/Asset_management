import { Department } from './../../Model/Class/department';
import { BusinessVerticalTypeAttributes } from './../../Model/Class/BusinesVertical';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, retry } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  http = inject(HttpClient)
  private baseUrl: string

  constructor() {
    this.baseUrl = environment.baseApiURL;
  }

  getAllDept(): Observable<Department[]> {
    return this.http.post<Department[]>(`${this.baseUrl}assets/departments/get-all`, {})
  }

  createDepartment(dept: any) {
    return this.http.post<Department>(`${this.baseUrl}assets/departments/create`, dept)
  }

  editDepartment(deptObj: any) {
    return this.http.post<Department>(`${this.baseUrl}assets/departments/update`, deptObj)

  }
  deleteDepartment(id: number) {
    return this.http.post<Department>(`${this.baseUrl}assets/departments/delete`, { id: id })
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.http.post<Department>(`${this.baseUrl}assets/departments/get-by-id`, { id: id })
  }

  getDepartmentByBvId(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}assets/business-verticals/get-all-departments`, { id: id })
  }

  getDepartmentsByDivisionId(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}assets/departments/get-by-division`, { businessDivisionId: id })
  }

  getAllAssetInstanceBDeptId(id : number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}assets/instances/by-department`, { id: id })
  }

}

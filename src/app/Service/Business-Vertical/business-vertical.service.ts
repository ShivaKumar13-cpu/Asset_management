import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { BusinessDivisionTypeAttributes, BusinessVerticalTypeAttributes } from '../../Model/Class/BusinesVertical';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessVerticalService {

  private cachedBusinessVertical: BusinessVerticalTypeAttributes[] = [];

  http = inject(HttpClient)
  private baseUrl: string
  constructor() {
    this.baseUrl = environment.baseApiURL;
  }


  getAllBusinessVertical(): Observable<BusinessVerticalTypeAttributes[]> {
    return this.http.post<BusinessVerticalTypeAttributes[]>(`${this.baseUrl}assets/business-verticals/get-all`, {}).pipe(tap((data: any) => (this.cachedBusinessVertical = data)), shareReplay(1));
  }

  getAllBusinessVerticalWhenCreated(): Observable<BusinessVerticalTypeAttributes[]> {
    return this.http.post<BusinessVerticalTypeAttributes[]>(`${this.baseUrl}assets/business-verticals/get-all`, {}).pipe(tap((data: any) => (this.cachedBusinessVertical = data)), shareReplay(1));
  }

  getBusinessVerticalById(id: number): Observable<BusinessVerticalTypeAttributes> {
    const body = { id: id }
    return this.http.post<BusinessVerticalTypeAttributes>(`${this.baseUrl}assets/business-verticals/get-by-id`, body);
  }

  createBusinessVertical(businessObj: Object) {
    return this.http.post<BusinessVerticalTypeAttributes>(`${this.baseUrl}assets/business-verticals/create`, businessObj);
  }

  onEditBusinessVertical(businessEditObj: any) {
    return this.http.post<BusinessVerticalTypeAttributes>(`${this.baseUrl}assets/business-verticals/update`, businessEditObj);
  }

  onDeleteBusinessVertical(id: number) {
    const body = { id: id }
    console.log(body);
    return this.http.post(`${this.baseUrl}assets/business-verticals/delete`, body);
  }

  getAllBusinessVerticalByBDId(id: number):Observable<BusinessDivisionTypeAttributes[]>{
    return this.http.post<BusinessDivisionTypeAttributes[]>(`${this.baseUrl}assets/business-verticals/by-division`, {businessDivisionId: id});
  }
  updateAddDepartment(obj: any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}assets/business-verticals/add-departments`, obj)
  }


  
  getAllBusinessDivision(): Observable<BusinessDivisionTypeAttributes[]> {
    return this.http.post<BusinessDivisionTypeAttributes[]>(`${this.baseUrl}assets/business-divisions/get-all`, {});
  }

  getBusinessDivisionById(id: number):Observable<any>{
    return this.http.post<BusinessDivisionTypeAttributes>(`${this.baseUrl}assets/business-divisions/get-by-id`, {id: id});
  }
  onEditBusinessDivision(businessEditObj: BusinessDivisionTypeAttributes) {
    return this.http.post<BusinessDivisionTypeAttributes>(`${this.baseUrl}assets/business-divisions/update`, businessEditObj);
  }
  createBusinessDivision(businessObj: any) {
    return this.http.post<BusinessDivisionTypeAttributes>(`${this.baseUrl}assets/business-divisions/create`, businessObj);
  }
  onDeleteBusinessDivision(id: number){
    const body = { id: id }
    console.log(body);
    return this.http.post(`${this.baseUrl}assets/business-divisions/delete`, body);
  }

}

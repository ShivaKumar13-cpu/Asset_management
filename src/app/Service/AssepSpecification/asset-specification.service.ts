import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand, CustomFields, Model, Vendor, Warrenty } from '../../Model/Class/AssetSpecification';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetSpecificationService {

  http = inject(HttpClient)
  private baseUrl: string
  constructor() {
    this.baseUrl = environment.baseApiURL;
  }



  getAllBrand(): Observable<Brand[]> {
    return this.http.post<Brand[]>(`${this.baseUrl}assets/brands/getAll`, {});
  }
  getAllModel(): Observable<Model[]> {
    return this.http.post<Model[]>(`${this.baseUrl}assets/models/getAll`, {});
  }
  getAllVendors(): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.baseUrl}assets/Vendortypes/getAll`, {});
  }
  getAllWarrenty(): Observable<Warrenty> {
    return this.http.post<Warrenty>(`${this.baseUrl}assets/warranties/getAll`, {});
  }
  getAllCustomField(): Observable<CustomFields>{
    return this.http.post<CustomFields>(`${this.baseUrl}assets/asset-custom-fields/getAll`, {});
  }


  createBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(`${this.baseUrl}assets/brands/create`, brand);
  }
  createModel(model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}assets/models/create`, model);
  }
  createVendor(vendor: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}assets/Vendortypes/create`, vendor);
  }
  createWarrenty(warrenty: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}assets/warranties/create`, warrenty);
  }

  getBrandById(id: number): Observable<any> {
    return this.http.post<Brand>(`${this.baseUrl}assets/brands/get-by-id`, { id: id });
  }
  getModelById(id: number): Observable<any> {
    return this.http.post<Model>(`${this.baseUrl}assets/models/get-by-id`, { id: id });
  }
  getVendorById(id: number): Observable<any> {
    return this.http.post<Vendor>(`${this.baseUrl}assets/Vendortypes/get-by-id`, { id: id });
  }
  getWarrentyById(id: number): Observable<any> {
    return this.http.post<Warrenty>(`${this.baseUrl}assets/warranties/get-by-id`, { id: id });
  }

  editBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(`${this.baseUrl}assets/brands/update`, brand);
  }
  editModel(model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}assets/models/update`, model);
  }
  editVendor(vendor: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}assets/Vendortypes/update`, vendor);
  }
  editWarrenty(warrenty: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}assets/warranties/update`, warrenty);
  }

  getModelByBrand(id: number): Observable<any> {
    return this.http.post<Warrenty>(`${this.baseUrl}assets/models/by-brand`, { brandId: id });
  }
}

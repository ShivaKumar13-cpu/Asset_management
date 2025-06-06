import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AssetVarient } from '../../Model/Class/AssetVarient';
import { Equipment } from '../../Model/Class/Equipment';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  http = inject(HttpClient)
  private baseUrl: string
  constructor() {
    this.baseUrl = environment.baseApiURL;
  }

  getAllAssetVarient(id: number): Observable<AssetVarient> {
    return this.http.post<AssetVarient>(`${this.baseUrl}assets/asset-variants/by-business-vertical`, { id: id })
  }

  createAssetVarient(AssetObj: AssetVarient): Observable<any> {
    return this.http.post<AssetVarient>(`${this.baseUrl}assets/asset-variants/create`, AssetObj)
  }
  updateAssetVarient(AssetObj: AssetVarient): Observable<any> {
    return this.http.post<AssetVarient>(`${this.baseUrl}assets/asset-variants/update`, AssetObj)
  }

  getAssetVarientById(id: number): Observable<AssetVarient> {
    return this.http.post<AssetVarient>(`${this.baseUrl}assets/asset-variants/get-by-id`, { id: id })
  }

  //Equipments
  getAllEquipments(): Observable<Equipment[]> {
    return this.http.post<Equipment[]>(`${this.baseUrl}assets/instances/getAll`, {})
  }

  getAssetVarientsByBvId(id: number): Observable<AssetVarient> {
    return this.http.post<AssetVarient>(`${this.baseUrl}assets/asset-variants/by-business-vertical`, { id: id })
  }

  createEqipment(equipment: any) {
    return this.http.post<Equipment>(`${this.baseUrl}assets/equipments/create`, equipment)

  }
  getEquipmentById(id: number) {
    return this.http.post<Equipment>(`${this.baseUrl}assets/equipments/get-by-id`, { id: id })
  }

  updateEqipment(equipment: any) {
    return this.http.post<Equipment>(`${this.baseUrl}assets/equipments/update`, equipment)
  }
  deleteEquipmentById(id: number) {
    console.log('enters with id', id)
    return this.http.post<any>(`${this.baseUrl}assets/equipments/delete`, { id: id })
  }

  //Assets
  getAllAssets(): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}assets/getAllDetailedAssets`, {})
  }

  getAssetsByDepartmentId(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}assets/by-department`, {departmentId: id});
  }
}
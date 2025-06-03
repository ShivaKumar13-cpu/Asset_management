import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventryService {

 http = inject(HttpClient)
  private baseUrl: string

  constructor() {
    this.baseUrl = environment.baseApiURL;
  }

  getAllInventry():Observable<any>{
    return this.http.post<any>(`${this.baseUrl}assets/inventory/get-all`, {});
  }
}

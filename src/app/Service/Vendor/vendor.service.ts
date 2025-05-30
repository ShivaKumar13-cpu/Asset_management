import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  http = inject(HttpClient);
    private baseUrl: string

  constructor() { 
      this.baseUrl = environment.baseApiURL;
        console.log(this.baseUrl);
  }

  getAllVendor():Observable<any>{
    return this.http.post<any>(`${this.baseUrl}assets/vendors/getAll`, {})
  }


}

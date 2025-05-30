import { environment } from './../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginAttribute, LoginResponse } from '../../Model/Class/loginAttribute';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  http = inject(HttpClient)
  private baseUrl: string

  constructor() {
    this.baseUrl = environment.baseApiURL;
  }

  onLogin(login: LoginAttribute): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}users/auth/login`,login);
  }

}

import { environment } from './../../../environments/environment';
import { UserAttribute } from './../../Model/Class/UserLoggedAttributes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);
  private baseUrl: string


  constructor() {
    this.baseUrl = environment.baseApiURL;
    console.log(this.baseUrl);

  }

  getAllUser(): Observable<UserAttribute> {
    return this.http.post<UserAttribute>(`${this.baseUrl}users/users/all`, {})
  }

  // getUserById(id: number):Observable<UserAttribute>{
  //   debugger
  //   console.log(id);

  //   return this.http.post<UserAttribute>(`${this.baseUrl}users/users/get-by-id`,{id: id})
  // }

  getUserById(id: number): Observable<UserAttribute> {
    return this.http.post<UserAttribute>(`${this.baseUrl}users/users/get-by-id`, { id: id });
  }


  createUser(user: UserAttribute): Observable<UserAttribute> {
    console.log(user);

    return this.http.post<UserAttribute>(`${this.baseUrl}users/users/create`, user)
  }

  getUserByToken(): Observable<UserAttribute> {
    return this.http.post<UserAttribute>(`${this.baseUrl}users/users/get-by-token`, {});
  }

  getUserByDeptId(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}users/users/by-department`, {
      departmentIds: [
        id
      ]
    });
  }

}

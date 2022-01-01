import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginRequest} from "./model/login-request";
import {LoginResponse} from "./model/login-response";
import {RegisterRequest} from "./model/register-request";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static REST_API_SERVER = "/api";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(loginRequest : LoginRequest) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(UserService.REST_API_SERVER + '/users/login', loginRequest, this.httpOptions);
  }

  register(registerRequest : RegisterRequest) : Observable<any> {
    return this.http.post<any>(UserService.REST_API_SERVER + '/users/register', registerRequest, this.httpOptions);
  }
}

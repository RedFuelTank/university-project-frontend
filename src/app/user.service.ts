import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "./model/login-request";
import {LoginResponse} from "./model/login-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static REST_API_SERVER = "/api";

  constructor(private http: HttpClient) { }

  login(loginRequest : LoginRequest) {
    return this.http.post<LoginResponse>(UserService.REST_API_SERVER + '/users/login', loginRequest);
  }
}

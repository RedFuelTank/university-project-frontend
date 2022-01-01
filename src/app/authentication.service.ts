import {Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {LoginRequest} from "./model/login-request";
import {LoginResponse} from "./model/login-response";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<LoginResponse | undefined>;
  public currentUser: Observable<LoginResponse | undefined>;

  constructor(private userService: UserService) {
    const currentUserString = localStorage.getItem("currentUser");
    const currentUserJson = currentUserString ? JSON.parse(currentUserString) : undefined;
    this.currentUserSubject = new BehaviorSubject(currentUserJson)
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    console.log("Login")

    return this.userService.login(loginRequest).
      pipe(map((loginResponse : LoginResponse) => {
        if (loginResponse && loginResponse.token) {
          localStorage.setItem("currentUser", JSON.stringify(loginResponse));
          this.currentUserSubject.next(loginResponse);
        }
        return loginResponse;

    }))
  }

  public get getCurrentUserValue(): LoginResponse | undefined {
    return this.currentUserSubject ? this.currentUserSubject.value : undefined
  }

  logout() {
    localStorage.removeItem("currentUser")
    this.currentUserSubject.next(undefined);
  }
}

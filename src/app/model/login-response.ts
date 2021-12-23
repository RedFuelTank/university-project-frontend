export class LoginResponse {
  public username : string;
  public token : string;
  public role : Role;


  constructor(username: string, token: string, role : string) {
    this.username = username;
    this.token = token;
    this.role = role as Role;
  }
}

enum Role {
  User = "USER",
  Admin = "ADMIN"
}

export class RegisterRequest {
  public username: string;
  public password: string;
  public name: string;
  public surname: string;
  public email: string;
  public phoneNumber: string;


  constructor(username: string, password: string, name: string, surname: string, email: string, phoneNumber: string) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}

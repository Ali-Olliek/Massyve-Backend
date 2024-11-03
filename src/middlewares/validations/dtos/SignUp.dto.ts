export class SignUpDTO {
  public username: string;
  public password: string;
  public email: string;
  constructor(request: any) {
    this.username = request.username;
    this.email = request.email;
    this.password = request.password;
  }
}
export class SignInDTO {
    public password: string;
    public email: string;
    constructor(request: any) {
        this.email = request.email
        this.password = request.password
    }
}
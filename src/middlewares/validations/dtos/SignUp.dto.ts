export class SignUpDTO {
    public name: string
    public password: string
    public email: string
    constructor(request:any) {
        this.name = request.name
        this.email = request.email
        this.password = request.password
    }
}
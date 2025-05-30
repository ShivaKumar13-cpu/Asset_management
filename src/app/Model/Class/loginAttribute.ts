export class LoginAttribute {
    username: string;
    password: string;

    constructor() {
        this.username = '';
        this.password = '';
    }

}

export interface LoginResponse {
    token: string;
    userId: number;
    username: string;
    employeeCode: string;
    email: string;
}
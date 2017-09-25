import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class ApiService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private auth: AuthService) {
    }

    authenticate(email, password) {
        this.http.post(this.apiUrl + '/login', {email, password}).subscribe((res) => this.auth.login(res));
    }

}

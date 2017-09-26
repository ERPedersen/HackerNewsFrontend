import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api/api.service";
import {AuthService} from "../../services/auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

    email: string;
    password: string;
    error: string = null;

    constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}

    ngOnInit() {}

    public login(): void {
        this.error = null;

        this.apiService.authenticate(this.email, this.password)
        .subscribe((res) => {
            this.authService.setToken(res.data);
            this.router.navigate(['']);
        }, (err) => {
            console.error(err);
            this.error = 'Username and password doesn\'t match';
        });
    }
}

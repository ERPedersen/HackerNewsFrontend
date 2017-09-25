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
    subscription: Subscription;

    constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.subscription = this.authService.authenticated$.subscribe((status) => this.onLoginChange(status));
    }

    public login(): void {
        console.log("TESt");
        console.log(this.email);
        this.apiService.authenticate(this.email, this.password);
    }

    private onLoginChange(status): void
    {
        if (status) {
            this.router.navigateByUrl('');
        }
    }

}

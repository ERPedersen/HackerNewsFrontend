import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api/api.service";
import {AuthService} from "../../services/auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ValidationService} from "../../services/validation/validation.service";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

    error: string = null;
    loading: boolean;

    email: any = {
        dirty: false,
        value: null,
        hasSuccess: true,
    };

    password: any = {
        dirty: false,
        value: null,
        hasSuccess: true,
    };

    constructor(private apiService: ApiService,
                private authService: AuthService,
                private router: Router,
                private validationService: ValidationService) {
    }

    ngOnInit() {
    }

    public login(): void {
        this.error = null;
        this.validateEmail();
        this.validatePassword();


        if (this.email.hasSuccess && this.password.hasSuccess) {
            this.performLogin();
        }
    }

    private performLogin(): void {
        this.loading = true;

        this.apiService.authenticate(this.email.value, this.password.value)
            .subscribe((res) => {
                this.authService.setToken(res.data);
                this.router.navigate(['']);
            }, () => {
                this.loading = false;
                this.error = 'The username and password doesn\'t match the credentials of any user in your database.';
            });
    }

    public validateEmail(): void {
        this.email.dirty = true;
        this.email.hasSuccess = this.validationService.validateEmail(this.email.value);
    }

    public validateEmailKeyUp(): void {
        if (this.email.dirty) {
            this.email.hasSuccess = this.validationService.validateEmail(this.email.value);
        }
    }

    public validatePassword(): void {
        this.password.dirty = true;
        this.password.hasSuccess = this.validationService.validatePassword(this.password.value);
    }

    public validatePasswordKeyUp() {
        if (this.password.dirty) {
            this.password.hasSuccess = this.validationService.validatePassword(this.password.value);
        }
    }
}

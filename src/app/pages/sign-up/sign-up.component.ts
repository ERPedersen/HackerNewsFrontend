import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Router} from '@angular/router';
import {SignUpUser} from '../../models/sign-up-user';
import {TokenService} from '../../services/token/token.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: 'sign-up.component.html',
    styleUrls: ['sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    error: string = null;
    loading: boolean;
    signUpUser: SignUpUser;

    constructor(private apiService: ApiService,
                private tokenService: TokenService,
                private router: Router) {
    }

    ngOnInit() {
        this.signUpUser = new SignUpUser(1, '', '', '');
    }

    public signUp(): void {
        this.loading = true;
        this.apiService.signUp(this.signUpUser.email, this.signUpUser.password, this.signUpUser.alias)
            .subscribe((res) => {
                this.tokenService.setToken(res.data);
                this.router.navigate(['']);
            }, (error) => {
                this.loading = false;
                if (error.hasOwnProperty('error')) {
                    const errorResponse = JSON.parse(error.error);
                    if (errorResponse.hasOwnProperty('message')) {
                        this.error = errorResponse.message;
                    }
                }
            });
    }
}

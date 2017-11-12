import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token/token.service';
import {LoginUser} from '../../models/login-user';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

    loading: boolean;
    loginUser: LoginUser;

    constructor(private apiService: ApiService,
                private tokenService: TokenService,
                private router: Router,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.loginUser = new LoginUser('', '');
    }

    public login(): void {
        this.loading = true;

        this.apiService.authenticate(this.loginUser.email, this.loginUser.password)
            .subscribe((res) => {
                this.tokenService.setToken(res.data);
                this.router.navigate(['']);
            }, () => {
                this.loading = false;
                this.toastr.error('The username and password doesn\'t match the credentials of any user in your database.');
            });
    }
}

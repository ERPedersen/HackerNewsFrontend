import { ApiService } from './../services/api/api.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    isPermitted: boolean;

    constructor(private authService: AuthService, private router: Router, private api: ApiService) {
    }

    canActivate() {
        let token = this.authService.getToken();

        if (token != null) {
            this.api.getProfileData(token).subscribe(
                user => {
                    console.log(user);
                    this.authService.setUser(user.data)
                    this.isPermitted = true;
                },
                err => {
                    this.authService.removeUser();
                    this.authService.removeToken();
                    this.isPermitted = false;
                });
        }

        return this.isPermitted;
    }
}

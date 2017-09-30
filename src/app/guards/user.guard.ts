import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth/auth.service';
import {ApiService} from '../services/api/api.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';

@Injectable()
export class UserGuard implements CanActivate {

    constructor(private authService: AuthService, private api: ApiService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const token = this.authService.getToken();

        if (token != null) {
            return this.api.getProfileData(token)
                .map(user => {
                    this.authService.setUser(user.data);
                    return true;
                }).catch(this.handleError.bind(this))
                .first();
        } else {
            this.authService.removeUser();
            return true;
        }
    }

    handleError() {
        this.authService.removeToken();
        this.authService.removeUser();
        return Observable.of(true);
    }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../services/user/user.service';
import {ApiService} from '../services/api/api.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';
import {TokenService} from '../services/token/token.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserGuard implements CanActivate {

    constructor(private authService: UserService, private tokenService: TokenService, private api: ApiService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const token = this.tokenService.getToken();

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
        this.tokenService.removeToken();
        this.authService.removeUser();
        return Observable.of(true);
    }
}

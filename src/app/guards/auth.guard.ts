import {ApiService} from '../services/api/api.service';
import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private api: ApiService) {
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
            this.router.navigate(['/login']);
            return Observable.of(false);
        }
    }

    handleError() {
        this.authService.removeToken();
        this.authService.removeUser();
        this.router.navigate(['/login']);
        return Observable.of(false);
    }
}

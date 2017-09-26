import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "../services/auth/auth.service";
import { ApiService } from "../services/api/api.service";
import 'rxjs/add/operator/catch';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private api: ApiService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let token = this.authService.getToken();
    console.log(token);

    if (token != null) {
      this.api.getProfileData(token)
        .subscribe(
          user => {
            this.authService.setUser(user.data);
            console.log(user.data.alias);
          },
          err => {
            console.log(err);
            this.authService.removeUser();
            this.authService.removeToken();
        });
    }
    return true;
  }
}

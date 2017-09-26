import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth/auth.service';
import { ApiService } from '../services/api/api.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private api: ApiService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const token = this.authService.getToken();
    console.log(token);

    if (token != null) {
      return this.api.getProfileData(token)
        .map(user => {
            this.authService.setUser(user.data);
            console.log(user.data.alias);
            return true;
        }).catch(this.handleError).first();
    } else {
        return true;
    }
  }

  handleError(error: Response) {
      return Observable.throw('Server error');
  }
}

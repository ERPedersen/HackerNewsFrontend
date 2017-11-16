import {TokenService} from './../../services/token/token.service';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {ApiService} from '../../services/api/api.service';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class PostsResolver implements Resolve<any> {

    constructor(private apiService: ApiService, private tokenService: TokenService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<boolean> {
        let token = this.tokenService.getToken();
        return this.apiService.getPosts(30, 1, token);
    }
}

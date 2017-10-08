import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {ApiService} from '../../services/api/api.service';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class PostsResolver implements Resolve<any> {

    constructor(private apiService: ApiService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<boolean> {
        return this.apiService.getPosts(10, 1);
    }
}

import { Subscription } from 'rxjs';
import { ApiService } from './../services/api/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {User} from './user';

@Injectable()
export class UserResolver implements Resolve<User> {
    
    constructor(private api: ApiService){

    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let token = localStorage.getItem('jwt');
        return this.api.getProfileData(token).first();
    }
}
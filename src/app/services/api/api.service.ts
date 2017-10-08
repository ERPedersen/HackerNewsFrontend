import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {UserService} from '../user/user.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private auth: UserService) {
    }

    authenticate(email, password): Observable<any> {
        return this.http.post(this.apiUrl + '/login', {email, password});
    }

    signUp(email, password, alias): Observable<any> {
        return this.http.post(this.apiUrl + '/signup', {email, password, alias});
    }

    getProfileData(token): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(this.apiUrl + '/profile', {headers});
    }

    getPosts(limit, page): Observable<any> {
        return this.http.get(this.apiUrl + `/post?limit=10&page=${page}`);
    }
}

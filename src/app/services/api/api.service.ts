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
        return this.http.get(this.apiUrl + `/hackerpost?limit=10&page=${page}`);
    }

    getPost(slug: string): Observable<any> {
        return this.http.get(this.apiUrl + `/hackerpost/${slug}`);
    }

    upvotePost(postId: number, token): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl + `/upvotepost`, {postRef: postId}, {headers});
    }

    downvotePost(postId: number, token): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl + '/downvotepost', {postRef: postId}, {headers});
    }

    postComment(post_ref, comment_ref, content, token): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl + '/comment', {post_ref, comment_ref, content}, {headers});
    }
}

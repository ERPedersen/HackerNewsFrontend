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
        return this.http.post(this.apiUrl + '/sign-up', {email, password, alias});
    }

    getProfileData(token): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(this.apiUrl + '/profile', {headers});
    }

    getPosts(limit, page, token): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(this.apiUrl + `/posts?limit=10&page=${page}`, {headers});
    }

    getPost(slug: string, token): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(this.apiUrl + `/posts/${slug}`, {headers});
    }

    upvotePost(postId: number, token): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl + `/posts/upvote`, {post_ref: postId}, {headers});
    }

    downvotePost(postId: number, token): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl + '/posts/downvote', {post_ref: postId}, {headers});
    }

    upvoteComment(commentId: number, token): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl + `/comments/upvote`, {comment_ref: commentId}, {headers});
    }

    downvoteComment(commentId: number, token): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl + '/comments/downvote', {comment_ref: commentId}, {headers});
    }

    postComment(post_ref, comment_ref, content, token): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl + '/comments', {post_ref, comment_ref, content}, {headers});
    }
}

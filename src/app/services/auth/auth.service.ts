import { User } from './../../models/user';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

    user: User;
    isLoggedIn: boolean = false;
    authenticated$: BehaviorSubject<any> = new BehaviorSubject(false);

    constructor(private router: Router) {
    }

    public setToken(token): void {
        localStorage.setItem('jwt', token);
    }

    public removeToken(): void {
        localStorage.removeItem('jwt');
    }

    public getToken(): any {
        return localStorage.getItem('jwt');
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public getUser(): any {
        return this.user;
    }

    public removeUser(): void {
        this.user = null;
    }
}

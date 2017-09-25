import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

    isLoggedIn: boolean = false;
    authenticated$: BehaviorSubject<any> = new BehaviorSubject(false);

    constructor(private router: Router) {
    }

    public login(res): void {
        localStorage.setItem('jwt', res.data);
        this.isLoggedIn = true;
        this.authenticated$.next(this.isLoggedIn);
        this.router.navigate(['']);
    }

    public logout(): void {
        localStorage.removeItem('jwt');
        this.isLoggedIn = false;
        this.authenticated$.next(this.isLoggedIn);
        this.router.navigate(['']);
    }

    public getToken(): any {
        let token = localStorage.getItem('jwt');

        if (token === null) {
            this.isLoggedIn = false;
            this.authenticated$.next(this.isLoggedIn);
        }

        return token;
    }
}

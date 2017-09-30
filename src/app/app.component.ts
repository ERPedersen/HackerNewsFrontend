import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    authSubscription: Subscription;
    authenticated = false;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authSubscription = this.authService.authenticated$.subscribe((res) => this.authenticated = res);
    }

}

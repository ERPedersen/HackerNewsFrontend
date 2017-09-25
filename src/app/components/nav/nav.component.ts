import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

    collapsed: boolean = false;
    loggedIn: boolean;
    authSubscription: Subscription;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authSubscription = this.authService.authenticated$.subscribe((loggedIn) => this.loggedIn = loggedIn);
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

    logout() {
        this.authService.logout();
    }

    collapse() {
        this.collapsed = !this.collapsed;
    }
}

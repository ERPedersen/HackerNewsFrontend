import {ApiService} from '../../services/api/api.service';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.scss']
})
export class NavComponent implements OnInit {

    collapsed: boolean;
    user: User = null;

    constructor(private authService: AuthService, private apiService: ApiService, private router: Router) {
    }

    ngOnInit() {
        this.user = this.authService.getUser();
    }

    logout() {
        this.authService.removeToken();
        this.authService.removeUser();
        this.user = null;
        this.router.navigate(['/login']);
    }

    collapse() {
        this.collapsed = !this.collapsed;
    }
}

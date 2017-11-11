import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token/token.service';

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html'
})
export class NavComponent implements OnInit {

    collapsed: boolean;
    user: User = null;

    constructor(private authService: UserService, private tokenService: TokenService, private router: Router) {
    }

    ngOnInit() {
        this.user = this.authService.getUser();
    }

    logout() {
        this.tokenService.removeToken();
        this.authService.removeUser();
        this.user = null;
        this.router.navigate(['/login']);
    }

    collapse() {
        this.collapsed = !this.collapsed;
    }
}

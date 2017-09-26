import { ApiService } from './../../services/api/api.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../models/user";

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.scss']
})
export class NavComponent implements OnInit {

    collapsed: boolean = false;
    user: User = null;

    constructor(private authService: AuthService, private apiService: ApiService) {
    }

    ngOnInit() {
        this.user = this.authService.getUser();
    }
}

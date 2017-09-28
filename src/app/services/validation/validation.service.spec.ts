import {TestBed, inject} from '@angular/core/testing';

import {ValidationService} from './validation.service';
import {APP_BASE_HREF} from "@angular/common";
import {UserResolver} from "../../models/user.resolver";
import {UserGuard} from "../../guards/user.guard";
import {AuthGuard} from "../../guards/auth.guard";
import {ApiService} from "../api/api.service";
import {AuthService} from "../auth/auth.service";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HomeComponent} from "../../pages/home/home.component";
import {NavComponent} from "../../components/nav/nav.component";
import {NotFoundComponent} from "../../pages/not-found/not-found.component";
import {LoginComponent} from "../../pages/login/login.component";
import {AppComponent} from "../../app.component";
import {RouteConf} from '../../routes';
import {PostResolver} from "../../resolvers/post-resolver";
import {MomentModule} from "angular2-moment";

describe('ValidationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                LoginComponent,
                NotFoundComponent,
                NavComponent,
                HomeComponent,
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpClientModule,
                MomentModule,
                RouterModule.forRoot(
                    RouteConf,
                    {enableTracing: true}
                )
            ],
            providers: [
                AuthService,
                ApiService,
                AuthGuard,
                UserGuard,
                UserResolver,
                PostResolver,
                ValidationService,
                {provide: APP_BASE_HREF, useValue: '/'}
            ]
        });
    });

    it('should ...', inject([ValidationService], (service: ValidationService) => {
        expect(service).toBeTruthy();
    }));
});

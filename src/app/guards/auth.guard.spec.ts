import {TestBed, inject} from '@angular/core/testing';
import {AuthGuard} from './auth.guard';
import {AuthService} from '../services/auth/auth.service';
import {ApiService} from '../services/api/api.service';
import {AppComponent} from '../app.component';
import {LoginComponent} from '../pages/login/login.component';
import {NotFoundComponent} from '../pages/not-found/not-found.component';
import {NavComponent} from '../components/nav/nav.component';
import {HomeComponent} from '../pages/home/home.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {UserGuard} from './user.guard';
import {UserResolver} from '../models/user.resolver';
import {APP_BASE_HREF} from '@angular/common';
import RouteConf from '../routes';

describe('AuthGuard', () => {
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
                {provide: APP_BASE_HREF, useValue: '/'}
            ]
        });
    });

    it('should ST', inject([AuthGuard], (guard: AuthGuard) => {
        expect(guard).toBeTruthy();
    }));
});

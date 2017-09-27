import { TestBed, async, inject } from '@angular/core/testing';

import { UserGuard } from './user.guard';
import {APP_BASE_HREF} from '@angular/common';
import {UserResolver} from '../models/user.resolver';
import {AuthGuard} from './auth.guard';
import {ApiService} from '../services/api/api.service';
import {AuthService} from '../services/auth/auth.service';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HomeComponent} from '../pages/home/home.component';
import {NavComponent} from '../components/nav/nav.component';
import {NotFoundComponent} from '../pages/not-found/not-found.component';
import {LoginComponent} from '../pages/login/login.component';
import {AppComponent} from '../app.component';
import RouteConf from '../routes';


describe('UserGuard', () => {
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

  it('should ...', inject([UserGuard], (guard: UserGuard) => {
    expect(guard).toBeTruthy();
  }));
});

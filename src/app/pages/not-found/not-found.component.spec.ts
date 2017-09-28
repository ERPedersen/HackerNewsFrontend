import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotFoundComponent} from './not-found.component';
import {APP_BASE_HREF} from '@angular/common';
import {UserResolver} from '../../models/user.resolver';
import {UserGuard} from '../../guards/user.guard';
import {AuthGuard} from '../../guards/auth.guard';
import {ApiService} from '../../services/api/api.service';
import {AuthService} from '../../services/auth/auth.service';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HomeComponent} from '../home/home.component';
import {NavComponent} from '../../components/nav/nav.component';
import {LoginComponent} from '../login/login.component';
import {AppComponent} from '../../app.component';
import {RouteConf} from '../../routes';
import {MomentModule} from "angular2-moment";
import {PostResolver} from "../../resolvers/post-resolver";

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;

    beforeEach(async(() => {
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
                {provide: APP_BASE_HREF, useValue: '/'}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create itself', () => {
        expect(component).toBeTruthy();
    });
});

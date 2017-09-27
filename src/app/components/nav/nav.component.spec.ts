import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavComponent} from './nav.component';
import {ApiService} from '../../services/api/api.service';
import {AuthService} from '../../services/auth/auth.service';
import {APP_BASE_HREF} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppComponent} from '../../app.component';
import {HomeComponent} from '../../pages/home/home.component';
import {LoginComponent} from '../../pages/login/login.component';
import {NotFoundComponent} from '../../pages/not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import RouteConf from '../../routes';

describe('NavComponent', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                NavComponent,
                HomeComponent,
                LoginComponent,
                NotFoundComponent
            ],
            imports: [
                HttpClientModule,
                RouterModule.forRoot(
                    RouteConf,
                    {enableTracing: true}
                )
            ],
            providers: [
                AuthService,
                ApiService,
                {provide: APP_BASE_HREF, useValue: '/'}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {NavComponent} from './components/nav/nav.component';
import {HomeComponent} from './pages/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {UserGuard} from './guards/user.guard';
import {AuthGuard} from './guards/auth.guard';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserResolver} from './models/user.resolver';
import {ApiService} from './services/api/api.service';
import {AuthService} from 'app/services/auth/auth.service';
import {APP_BASE_HREF} from '@angular/common';
import {RouteConf} from './routes';
import {MomentModule} from "angular2-moment";
import {PostResolver} from "./resolvers/post-resolver";

describe('AppComponent', () => {
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
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});

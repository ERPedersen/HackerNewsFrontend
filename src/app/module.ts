import {ApiService} from './services/api/api.service';
import {UserService} from './services/user/user.service';
import {RouterModule} from '@angular/router';
import {MomentModule} from 'angular2-moment';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HomeComponent} from './pages/home/home.component';
import {NavComponent} from './components/nav/nav.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LoginComponent} from './pages/login/login.component';
import {AppComponent} from './app.component';
import {ValidationService} from './services/validation/validation.service';
import {AuthGuard} from './guards/auth.guard';
import {UserGuard} from './guards/user.guard';
import {PostResolver} from './resolvers/post-resolver';
import {RouteConf} from './routes';
import {APP_BASE_HREF} from '@angular/common';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {TokenService} from './services/token/token.service';

export const GlobalModules = {
    declarations: [
        AppComponent,
        LoginComponent,
        NotFoundComponent,
        NavComponent,
        HomeComponent,
        SignUpComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MomentModule,
        RouterModule.forRoot(
            RouteConf,
            // {enableTracing: true}
        )
    ],
    providers: [
        UserService,
        ApiService,
        ValidationService,
        TokenService,
        AuthGuard,
        UserGuard,
        PostResolver,
        {provide: APP_BASE_HREF, useValue: '/'}
    ]
};

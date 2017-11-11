import { CreateComponent } from './pages/create/create.component';
import {AnimationService} from './services/animation/animation.service';
import {IconService} from './services/icon/icon.service';
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
import {PostsResolver} from './resolvers/posts/posts-resolver';
import {RouteConf} from './routes';
import {APP_BASE_HREF} from '@angular/common';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {TokenService} from './services/token/token.service';
import {PostComponent} from './pages/post/post.component';
import {PostResolver} from './resolvers/post/post-resolver';
import { NgProgressModule } from 'ngx-progressbar';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ToastrModule} from 'ngx-toastr';

export const GlobalModules = {
    declarations: [
        AppComponent,
        LoginComponent,
        NotFoundComponent,
        NavComponent,
        HomeComponent,
        SignUpComponent,
        PostComponent,
        CreateComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
            timeOut: 5000,
            extendedTimeOut: 5000,
        }),
        FormsModule,
        HttpClientModule,
        MomentModule,
        NgProgressModule,
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
        IconService,
        AuthGuard,
        UserGuard,
        PostsResolver,
        PostResolver,
        AnimationService,
        {provide: APP_BASE_HREF, useValue: '/'}
    ]
};

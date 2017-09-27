import { UserResolver } from './models/user.resolver';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

import {AuthService} from './services/auth/auth.service';
import {ApiService} from './services/api/api.service';

import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {UserGuard} from './guards/user.guard';
import {NavComponent} from './components/nav/nav.component';
import {HomeComponent} from './pages/home/home.component';
import {ValidationService} from "./services/validation/validation.service";

const appRoutes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full', canActivate: [UserGuard]},
    {path: 'restricted', component: LoginComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent, canActivate: [UserGuard]},
    {path: '**', component: NotFoundComponent, canActivate: [UserGuard]}
];

@NgModule({
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
            appRoutes,
            {enableTracing: true}
        )
    ],
    providers: [
        AuthService,
        ApiService,
        ValidationService,
        AuthGuard,
        UserGuard,
        UserResolver,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi: true
        // }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

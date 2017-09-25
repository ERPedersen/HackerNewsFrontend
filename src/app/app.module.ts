import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

import {AuthService} from "./services/auth/auth.service";
import {ApiService} from "./services/api/api.service";
import {AuthInterceptor} from "./interceptors/auth-interceptor";

import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {NavComponent} from './components/nav/nav.component';
import {HomeComponent} from './pages/home/home.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: '**', component: NotFoundComponent}
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
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {NavComponent} from '../../components/nav/nav.component';
import {NotFoundComponent} from '../not-found/not-found.component';
import {LoginComponent} from '../login/login.component';
import {AppComponent} from '../../app.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {ApiService} from '../../services/api/api.service';
import {AuthGuard} from '../../guards/auth.guard';
import {UserGuard} from '../../guards/user.guard';
import {UserResolver} from '../../models/user.resolver';
import {APP_BASE_HREF} from '@angular/common';
import {RouteConf} from '../../routes';
import {PostResolver} from "../../resolvers/post-resolver";
import {MomentModule} from "angular2-moment";
import {ValidationService} from "../../services/validation/validation.service";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

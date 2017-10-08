import {UserGuard} from './guards/user.guard';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {HomeComponent} from './pages/home/home.component';
import {PostResolver} from './resolvers/post-resolver';
import {SignUpComponent} from './pages/sign-up/sign-up.component';

export const RouteConf = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [UserGuard],
        resolve: {
            posts: PostResolver
        }
    },
    {
        path: 'restricted',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [UserGuard]
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [UserGuard]
    },
    {
        path: '**',
        component: NotFoundComponent,
        canActivate: [UserGuard]
    }
];

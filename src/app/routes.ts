import { CreateComponent } from './pages/create/create.component';
import {UserGuard} from './guards/user.guard';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {HomeComponent} from './pages/home/home.component';
import {PostsResolver} from './resolvers/posts/posts-resolver';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {PostComponent} from './pages/post/post.component';
import {PostResolver} from './resolvers/post/post-resolver';

export const RouteConf = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [UserGuard],
        resolve: {
            posts: PostsResolver
        }
    },
    {
        path: 'posts/:slug',
        component: PostComponent,
        canActivate: [UserGuard],
        resolve: {
            post: PostResolver
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
        path: 'create',
        component: CreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: NotFoundComponent,
        canActivate: [UserGuard]
    }
];

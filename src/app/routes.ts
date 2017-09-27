import {UserGuard} from './guards/user.guard';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {HomeComponent} from './pages/home/home.component';

const Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full', canActivate: [UserGuard]},
    {path: 'restricted', component: LoginComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent, canActivate: [UserGuard]},
    {path: '**', component: NotFoundComponent, canActivate: [UserGuard]}
];

export default Routes;

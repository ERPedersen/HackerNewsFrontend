import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {ApiService} from '../../services/api/api.service';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class PostResolver implements Resolve<any> {

    constructor(private apiService: ApiService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<boolean> {
        return this.apiService.getPost(route.paramMap.get('slug'))
            .map((res: Response) => {
                if (!res) {
                    this.router.navigateByUrl('/404', {skipLocationChange: true});
                    return Observable.of(null);
                }
                return res;
            })
            .catch((error: any) => {
                // TODO: Handle error
                this.router.navigateByUrl('/', {skipLocationChange: true});
                return Observable.of(null);
            });
    }
}

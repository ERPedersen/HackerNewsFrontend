import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {ApiService} from "../services/api/api.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class PostResolver implements Resolve<any> {

    constructor(private apiService: ApiService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<boolean> {
        return this.apiService.getPosts(10, 1);
    }
}

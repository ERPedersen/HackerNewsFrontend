import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth/auth.service";
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do(() => {
            // Do nothing
        }, (err: any) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                this.auth.logout();
            }
        });
    }
}

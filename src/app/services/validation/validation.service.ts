import {Injectable} from '@angular/core';

@Injectable()
export class ValidationService {

    constructor() {
    }

    public validateEmail(email): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    public validatePassword(password): boolean {
        return password != null && password.length > 3;
    }

    public validateAlias(alias): boolean {
        return alias != null && alias.length > 3;
    }

}
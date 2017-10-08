import {Injectable} from '@angular/core';

@Injectable()
export class TokenService {

    /**
     * Saves the provided JWT to local storage.
     * @param token
     */
    public setToken(token): void {
        localStorage.setItem('jwt', token);
    }

    /**
     * Removes the JWT from local storage.
     */
    public removeToken(): void {
        localStorage.clear();
    }

    /**
     * Retrieves the JWT from local storage.
     * @returns {String}
     */
    public getToken(): any {
        return localStorage.getItem('jwt');
    }
}

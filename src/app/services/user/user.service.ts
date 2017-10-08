import {User} from '../../models/user';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

    user: User;

    public setUser(user: User): void {
        this.user = user;
    }

    public getUser(): User {
        return this.user;
    }

    public removeUser(): void {
        this.user = null;
    }
}

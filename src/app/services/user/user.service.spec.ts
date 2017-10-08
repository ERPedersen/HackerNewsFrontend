import {TestBed, inject} from '@angular/core/testing';
import {UserService} from './user.service';
import {GlobalModules} from '../../module';

describe('UserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            ...GlobalModules
        });
    });

    it('should create', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));
});

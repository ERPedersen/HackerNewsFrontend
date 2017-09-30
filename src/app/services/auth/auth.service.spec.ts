import {TestBed, inject} from "@angular/core/testing";
import {AuthService} from "./auth.service";
import {GlobalModules} from "../../module";

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            ...GlobalModules
        });
    });

    it('should create', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));
});

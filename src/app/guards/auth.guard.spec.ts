import {TestBed, inject} from "@angular/core/testing";
import {AuthGuard} from "./auth.guard";
import {GlobalModules} from "../module";

describe('AuthGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            ...GlobalModules
        });
    });

    it('should create', inject([AuthGuard], (guard: AuthGuard) => {
        expect(guard).toBeTruthy();
    }));
});

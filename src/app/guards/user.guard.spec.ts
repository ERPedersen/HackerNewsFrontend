import {TestBed, inject} from "@angular/core/testing";
import {UserGuard} from "./user.guard";
import {GlobalModules} from "../module";

describe('UserGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            ...GlobalModules
        });
    });

    it('should create', inject([UserGuard], (guard: UserGuard) => {
        expect(guard).toBeTruthy();
    }));
});

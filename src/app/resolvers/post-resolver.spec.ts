import {TestBed, inject} from "@angular/core/testing";
import {PostResolver} from "./post-resolver";
import {GlobalModules} from "../module";

describe('PostResolver', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            ...GlobalModules
        });
    });

    it('should create', inject([PostResolver], (guard: PostResolver) => {
        expect(guard).toBeTruthy();
    }));
});
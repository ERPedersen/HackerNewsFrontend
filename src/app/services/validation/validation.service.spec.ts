import {TestBed, inject} from "@angular/core/testing";
import {ValidationService} from "./validation.service";
import {GlobalModules} from "../../module";

describe('ValidationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            ...GlobalModules
        });
    });

    it('should create', inject([ValidationService], (service: ValidationService) => {
        expect(service).toBeTruthy();
    }));
});

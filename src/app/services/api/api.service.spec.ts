import {TestBed, inject} from "@angular/core/testing";
import {ApiService} from "./api.service";
import {GlobalModules} from "../../module";

describe('ApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            ...GlobalModules
        });
    });

    it('should create', inject([ApiService], (service: ApiService) => {
        expect(service).toBeTruthy();
    }));
});

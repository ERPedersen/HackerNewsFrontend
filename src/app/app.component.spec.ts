import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {GlobalModules} from "./module";

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            ...GlobalModules
        }).compileComponents();
    }));

    it('should create', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});

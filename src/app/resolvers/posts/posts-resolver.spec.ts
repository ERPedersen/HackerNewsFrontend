import {TestBed, inject} from '@angular/core/testing';
import {PostsResolver} from './posts-resolver';
import {GlobalModules} from '../../module';

describe('PostsResolver', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            ...GlobalModules
        });
    });

    it('should create', inject([PostsResolver], (guard: PostsResolver) => {
        expect(guard).toBeTruthy();
    }));
});

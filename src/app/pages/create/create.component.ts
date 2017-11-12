import {Router} from '@angular/router';
import {CreatePost} from './../../models/create-post';
import {AnimationService} from './../../services/animation/animation.service';
import {TokenService} from './../../services/token/token.service';
import {ApiService} from './../../services/api/api.service';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

    error: string;
    errorCode: string;
    post: CreatePost;
    loading: boolean;

    constructor(private apiService: ApiService,
                private tokenService: TokenService,
                private router: Router,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.post = new CreatePost('url', '', '', '');
        this.loading = false;
    }

    createPost() {
        const token = this.tokenService.getToken();
        this.loading = true;
        this.apiService.createPost(this.post.type, this.post.url, this.post.title, this.post.content, token).subscribe((res) => {
            this.toastr.success('Your post was successfully submitted.');
            this.router.navigate(['/posts/' + res.data.slug]);
        }, (error) => {
            this.loading = false;
            this.toastr.error(JSON.parse(error.error).message);
        });
    }

    switchPostType(type: string): void {
        this.post.type = type;
    }

}

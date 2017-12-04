import {Component, OnInit, HostListener} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api/api.service';
import {Post} from '../../models/post';
import {TokenService} from '../../services/token/token.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

    posts: [Post];
    page: number;
    hasMore: boolean;
    loading: boolean;

    constructor(private route: ActivatedRoute,
                private apiService: ApiService,
                private tokenService: TokenService,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        const response = this.route.snapshot.data['posts'];
        if (typeof response !== 'undefined') {
            if (response.code !== 0) {
                this.toastr.error('An unexpected error occurred');
            } else if (response == null) {
                this.toastr.error('No posts were found');
            } else if (response.data.posts.length > 0) {
                this.posts = response.data.posts;
                this.hasMore = response.data.has_more;
                this.page = response.data.last_id;
            }
        }
    }

    loadMorePosts() {
        this.loading = true;
        const token = this.tokenService.getToken();

        this.apiService.getPosts(30, this.page, token).subscribe((res) => {
            if (res.code !== 0) {
                this.toastr.error('An unexpected error occurred');
                this.hasMore = false;
                this.loading = false;
            } else if (res.data.posts.length > 0) {
                setTimeout(() => {
                    this.posts.push(...res.data.posts);
                    this.hasMore = res.data.has_more;
                    this.page = res.data.last_id;
                    this.loading = false;
                }, 1000);
            }
        });
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        const maxHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.scrollTop;
        const scrollAmount = document.documentElement.clientHeight;

        if (maxHeight - clientHeight - scrollAmount < 300) {
            if (this.hasMore && !this.loading) {
                this.loadMorePosts();
            }
        }
    }

    upvotePost(index): void {
        const token = this.tokenService.getToken();
        const post = this.posts[index];

        this.apiService.upvotePost(post.id, token).subscribe((res) => {
            post.karma = res.data.karma;
            post.my_vote = res.data.my_vote;
        }, () => {
            this.toastr.info('You need to be a registered user in order to upvote.');
        });
    }

    downvotePost(index): void {
        const token = this.tokenService.getToken();

        const post = this.posts[index];

        this.apiService.downvotePost(post.id, token).subscribe((res) => {
            post.karma = res.data.karma;
            post.my_vote = res.data.my_vote;
        }, () => {
            this.toastr.info('You need to be a registered user with at least 50 karma in order to downvote.');
        });
    }
}

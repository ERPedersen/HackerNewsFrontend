import {AnimationService} from './../../services/animation/animation.service';
import {IconService} from './../../services/icon/icon.service';
import {Component, OnInit, HostListener} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api/api.service';
import {Post} from '../../models/post';
import {TokenService} from '../../services/token/token.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

    posts: [Post];
    error: string;
    errorCode: string;
    page;
    hasMore: boolean;
    loading: boolean;

    constructor(private route: ActivatedRoute,
                private apiService: ApiService,
                private tokenService: TokenService,
                private animationService: AnimationService,
                private iconService: IconService) 
                {
    }

    ngOnInit() {
        const response = this.route.snapshot.data['posts'];

        if (typeof response !== 'undefined') {
            if (response.code !== 0) {
                this.error = response.message;
            } else if (response == null) {
                this.error = 'No posts were found.';
            } else if (response.data.posts.length > 0) {
                this.posts = response.data.posts;
                this.hasMore = response.data.has_more;
                this.page = 1;
            }
        }
    }

    loadMorePosts() {
        this.loading = true;
        let token = this.tokenService.getToken();

        this.apiService.getPosts(10, ++this.page, token).subscribe((res) => {
            if (res.code !== 0) {
                this.error = res.message;
                this.hasMore = false;
                this.loading = false;
            } else if (res.data.posts.length > 0) {
                this.posts.push(...res.data.posts);
                this.hasMore = res.data.has_more;
                this.loading = false;
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
            alert('You need to be a registered user in order to upvote.');
        });
    }

    downvotePost(index): void {
        const token = this.tokenService.getToken();

        const post = this.posts[index];
        
        this.apiService.downvotePost(post.id, token).subscribe((res) => {
            post.karma = res.data.karma;
            post.my_vote = res.data.my_vote;
        }, () => {
            alert('You need to be a registered user with at least 50 karma in order to downvote.');
        });
    }
}

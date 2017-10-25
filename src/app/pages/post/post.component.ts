import { AnimationService } from './../../services/animation/animation.service';
import { IconService } from './../../services/icon/icon.service';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../models/post';
import {CommentSubmission, Comment} from '../../models/comment';
import {ApiService} from '../../services/api/api.service';
import {TokenService} from '../../services/token/token.service';
import {UserService} from 'app/services/user/user.service';
import {User} from '../../models/user';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    post: Post;
    loading: boolean;
    error: string = null;
    errorCode: string;
    commentSuccess: boolean;
    commentField: CommentSubmission;
    comments: Comment[] = new Array();
    user: User;

    constructor(private route: ActivatedRoute,
                private apiService: ApiService,
                private tokenService: TokenService,
                private userService: UserService,
                private ref: ChangeDetectorRef,
                private animationService: AnimationService,
                private iconService: IconService) {
    }

    ngOnInit() {

        const response = this.route.snapshot.data['post'];
        if (response) {
            if (response.data) {
                this.post = response.data.post;
                this.comments = response.data.comments.comments;
            }
        }

        this.user = this.userService.getUser();
        if (this.user != null && this.post != null) {
            this.commentField = new CommentSubmission(this.user.id, this.post.id, 0, '');
        } else {
            this.commentField = new CommentSubmission(0, 0, 0, '');
        }
    }

    onSubmit() {
        if (this.commentField.user_ref !== 0 && this.commentField.post_ref !== 0) {
            this.error = null;
            this.loading = true;
            this.commentSuccess = false;
            this.postCommentToPost();
        } else {
            this.errorCode = "403";
            this.error = 'You must be logged in to post a comment.';
            this.animationService.fadeIn("#error-element");
        }
    }

    public postCommentToPost(): void {
        const token = this.tokenService.getToken();

        this.apiService.postComment(this.commentField.post_ref, this.commentField.comment_ref, this.commentField.content, token)
            .subscribe((res) => {
                this.loading = false;
                this.commentField.content = '';
                this.commentSuccess = true;
                this.comments.push(res.data.comment);
                this.animationService.fadeOut("#error-element");
            }, (error) => {
                this.loading = false;
                this.commentSuccess = false;
                if (error.hasOwnProperty('error')) {
                    const errorResponse = JSON.parse(error.error);
                    if (errorResponse.hasOwnProperty('message')) {
                        this.error = errorResponse.message;
                    }
                    this.errorCode = error.status;
                }
                this.animationService.fadeIn("#error-element");
            });
    }

    upvotePost(post: Post, node): void {
        const token = this.tokenService.getToken();
        
        this.apiService.upvotePost(post.id, token).subscribe((res) => {
            post.karma = res.data.karma;
            this.iconService.swapIcon(0, node, "post");
            this.animationService.fadeOut("#error-element");
        }, (error) => {
            let errorResponse = JSON.parse(error.error);
            this.errorCode = error.status;
            this.error = errorResponse.message;
            this.animationService.fadeIn("#error-element");
        });
    }

    downvotePost(post: Post, node): void {
        const token = this.tokenService.getToken();
        
        this.apiService.downvotePost(post.id, token).subscribe((res) => {
            post.karma = res.data.karma;
            this.iconService.swapIcon(0, node, "post");
            this.animationService.fadeOut("#error-element");
        }, (error) => {
            let errorResponse = JSON.parse(error.error);
            this.errorCode = error.status;
            this.error = errorResponse.message;
            this.animationService.fadeIn("#error-element");
        });
    }

    upvoteComment(index, node): void {
        const token = this.tokenService.getToken();
        let comment = this.comments[index];

        this.apiService.upvoteComment(comment.id, token).subscribe((res) => {
            comment.karma = res.data.karma;
            this.iconService.swapIcon(index, node, "comment");
            this.animationService.fadeOut("#error-element");
        }, (error) => {
            let errorResponse = JSON.parse(error.error);
            this.errorCode = error.status;
            this.error = errorResponse.message;
            this.animationService.fadeIn("#error-element");
        });
    }

    downvoteComment(index, node): void {
        const token = this.tokenService.getToken();
        let comment = this.comments[index];

        this.apiService.downvoteComment(comment.id, token).subscribe((res) => {
            comment.karma = res.data.karma;
            this.iconService.swapIcon(index, node, "comment");
            this.animationService.fadeOut("#error-element");
        }, (error) => {
            let errorResponse = JSON.parse(error.error);
            this.errorCode = error.status;
            this.error = errorResponse.message;
            this.animationService.fadeIn("#error-element");
        });
    }
}

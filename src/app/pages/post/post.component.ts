import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../models/post';
import {CommentSubmission, Comment} from '../../models/comment';
import {ApiService} from '../../services/api/api.service';
import {TokenService} from '../../services/token/token.service';
import {UserService} from 'app/services/user/user.service';
import {User} from '../../models/user';
import {ToastrService} from 'ngx-toastr';

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
    comments: Comment[] = [];
    user: User;

    constructor(private route: ActivatedRoute,
                private apiService: ApiService,
                private tokenService: TokenService,
                private userService: UserService,
                private toastr: ToastrService) {
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
            this.errorCode = '403';
            this.error = 'You must be logged in to post a comment.';
        }
    }

    public postCommentToPost(): void {
        const token = this.tokenService.getToken();

        this.apiService.postComment(this.commentField.post_ref, this.commentField.comment_ref, this.commentField.content, token)
            .subscribe((res) => {
                this.loading = false;
                this.commentField.content = '';
                this.comments.unshift(res.data.comment);
                this.toastr.success('Your comment was successfully posted.');
            }, (error) => {
                this.loading = false;
                if (error.hasOwnProperty('error')) {
                    const errorResponse = JSON.parse(error.error);
                    if (errorResponse.hasOwnProperty('message')) {
                        this.error = errorResponse.message;
                    }
                    this.errorCode = error.status;
                }
            });
    }

    upvotePost(post: Post): void {
        const token = this.tokenService.getToken();

        this.apiService.upvotePost(post.id, token).subscribe((res) => {
            post.karma = res.data.karma;
            post.my_vote = res.data.my_vote;
        }, () => {
            alert('You need to be a registered user in order to upvote.');
        });
    }

    downvotePost(post: Post): void {
        const token = this.tokenService.getToken();

        this.apiService.downvotePost(post.id, token).subscribe((res) => {
            post.karma = res.data.karma;
            post.my_vote = res.data.my_vote;
        }, () => {
            alert('You need to be a registered user with at least 50 karma in order to downvote.');
        });
    }

    upvoteComment(index): void {
        const token = this.tokenService.getToken();
        const comment = this.comments[index];

        this.apiService.upvoteComment(comment.id, token).subscribe((res) => {
            comment.karma = res.data.karma;
            comment.my_vote = res.data.my_vote;
        }, () => {
            alert('You need to be a registered user in order to upvote.');
        });
    }

    downvoteComment(index): void {
        const token = this.tokenService.getToken();
        const comment = this.comments[index];

        this.apiService.downvoteComment(comment.id, token).subscribe((res) => {
            comment.karma = res.data.karma;
            comment.my_vote = res.data.my_vote;
        }, () => {
            alert('You need to be a registered user with at least 50 karma in order to downvote.');
        });
    }
}

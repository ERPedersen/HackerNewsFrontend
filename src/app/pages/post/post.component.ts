import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../models/post';
import {CommentSubmission, Comment} from '../../models/comment';
import {ApiService} from '../../services/api/api.service';
import {TokenService} from '../../services/token/token.service';
import {UserService} from 'app/services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post;
  loading: boolean;
  error: string = null;
  submitted: boolean;
  commentField: CommentSubmission;
  comments: Comment;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private tokenService: TokenService,
              private userService: UserService) { }

  ngOnInit() {
      const response = this.route.snapshot.data['post'];
      if (response) {
         if (response.data) {
            this.post = response.data;
         }
      }

      const currentUser = this.userService.getUser();
      if (currentUser != null && this.post != null) {
          this.commentField = new CommentSubmission(currentUser.id, this.post.id, 0, '');
      } else {
          this.commentField = new CommentSubmission(0, 0, 0, '');
      }
  }

  onSubmit() {
      if (this.commentField.user_ref !== 0 && this.commentField.post_ref !== 0) {
          this.submitted = true;
          this.error = null;
          this.loading = true;
          this.postCommentToPost();
      } else {
          this.error = 'You must be logged in to post a comment.';
      }
  }

    public postCommentToPost(): void {
        const token = this.tokenService.getToken();

        this.apiService.postComment(this.commentField.user_ref, this.commentField.post_ref,
                                    this.commentField.comment_ref, this.commentField.content, token)
            .subscribe((res) => {
                this.loading = false;
                this.commentField.content = '';
            }, (error) => {
                this.loading = false;
                if (error.hasOwnProperty('error')) {
                    const errorResponse = JSON.parse(error.error);
                    if (errorResponse.hasOwnProperty('message')) {
                        this.error = errorResponse.message;
                    }
                }
            });

    }

}

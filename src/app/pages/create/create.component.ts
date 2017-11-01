import { Router } from '@angular/router';
import { CreatePost } from './../../models/create-post';
import { AnimationService } from './../../services/animation/animation.service';
import { TokenService } from './../../services/token/token.service';
import { ApiService } from './../../services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { PatternValidator } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  error: string;
  errorCode: string;
  message: string;
  post: CreatePost;
  postError: Array<any>;
  loading: boolean;

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private animationService: AnimationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.post = new CreatePost("url", "", "", "");
    this.loading = false;
  }

  createPost(type, title, content) {
    const token = this.tokenService.getToken();
    this.loading = true;

    if (this.validatePost() == true) {
      
      this.apiService.createPost(
          this.post.type,
          this.post.url, 
          this.post.title, 
          this.post.content, 
          token).subscribe((res) => {
        this.message = "Post succesfully created.";
        this.animationService.fadeOut("#error-element");
        this.animationService.fadeIn("#success-element");
        this.router.navigate(['']);
      }, (error) => {
        let errorResponse = JSON.parse(error.error);
        this.errorCode = error.status;
        this.error = errorResponse.message;
        this.animationService.fadeIn("#error-element");
        this.loading = false;
      });
    } else {
      this.animationService.fadeIn("#post-error-element");
      this.loading = false;
    }
  }

  validatePost(): boolean {
    this.postError = new Array<any>();

    if (this.post.type == "url") {
      if (this.post.title == "") this.postError.push("Please enter a valid title");
      if (this.post.url == "") this.postError.push("Please provide a url");
      if (this.post.url != "" && !this.validateUrl()) this.postError.push("Please provide a valid url");
    } else {
      if (this.post.title == "") this.postError.push("Please enter a valid title");
      if (this.post.content.length < 3) this.postError.push("Your article is to short")
      if (this.post.content.length > 255) this.postError.push("Your article is to long");
      this.post.url = "";
    }
    return this.postError.length == 0;
  }

  validateUrl(): boolean {
    console.log("validating url");
    var regex = new RegExp(
      "^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*‌​)*(\/?)([a-zA-Z0-9\-‌​\.\?\,\'\/\\\+&amp;%‌​\$#_]*)?$"
    );

    return regex.test(this.post.url);
  }

}

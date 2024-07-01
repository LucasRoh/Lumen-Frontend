import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Post} from "../../interfaces/post-interface";
import {CommentComponent} from "../comment/comment.component";
import {PostService} from "../../services/post.service";
import {Comment} from "../../interfaces/comment-interface";
import {CommentFormComponent} from "../comment-form/comment-form.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  template: `
    <div class="post">
      <div class="post-user-profil">
        <img src="../../../assets/images/Profil.png" alt="profil">
        <p>User: {{ post.account?.name }}</p>
      </div>
      <p class="post-answer">{{ post.answer }}</p>
      <div class="post-blc">
        <button type="button" class="comment-button" (click)="toggleCommentForm()" >{{ showCommentForm ? "x Cancel": "+ Comment" }}</button>
        
        <img class="post-likes" src="../../../assets/images/Like.png" alt="abcd">
        <p> {{post.likes}}</p>
      </div>
    </div>
    <div>
      <app-comment-form
          *ngIf="showCommentForm"
          [postId]="post.id"
          (commentCreated)="handleCommentCreated($event)"
      ></app-comment-form>
    </div>
    <app-comment *ngFor="let comment of commentList" [comment]="comment"></app-comment>
  `,
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input() post!: Post;

  commentList: Comment[] = [];

  showCommentForm: boolean = false;

  constructor(
      private postService: PostService,
  ) {
  }

  ngOnInit(): void {
    this.loadCommentsByPostId()
  }

  loadCommentsByPostId(){
    this.postService.getCommentsByPostId(this.post.id).then(comments => {
      this.commentList = comments
    })
  }

  //switch to show CommentForm or not when button is clicked
  toggleCommentForm(){
    this.showCommentForm = !this.showCommentForm;
  }

  handleCommentCreated(newComment: Comment){
    this.commentList.push(newComment);
    this.showCommentForm=false;
    this.loadCommentsByPostId();
  }




}

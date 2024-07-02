import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Post} from "../../interfaces/post-interface";
import {CommentComponent} from "../comment/comment.component";
import {PostService} from "../../services/post.service";
import {Comment} from "../../interfaces/comment-interface";
import {CommentFormComponent} from "../comment-form/comment-form.component";
import { ChangeDetectorRef } from '@angular/core';
import {AccountService} from "../../services/account.service";

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
      <div class="post-blc" *ngIf="loggedIn()">
        <button type="button" class="comment-button" (click)="toggleCommentForm()" >{{ showCommentForm ? "x Cancel": "+ Comment" }}</button>
        <button type="button" class="edit-button" *ngIf="canIEditAndDelete()"> Edit </button>
        <button type="button" class="delete-button" *ngIf="canIEditAndDelete()"> Delete </button>
        
        <img class="post-likes" src="../../../assets/images/Like.png" alt="abcd" (click)="onClick()">
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
export class PostComponent implements OnInit {
    @Input() post!: Post;
    likeStatus: boolean = true;
    commentList: Comment[] = [];

    showCommentForm: boolean = false;

    constructor(
        private postService: PostService,
        private accountService: AccountService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    public loggedIn(): boolean {
        if (localStorage.getItem("userId") !== null) {
            return true;
        } else {
            return false;
        }
    }

    ngOnInit(): void {
        this.loadCommentsByPostId()
    }

    async reloadLikes() {
        const updatedPost = await this.postService.getPostById(this.post.id);
        this.post.likes = updatedPost.likes;
        this.changeDetectorRef.detectChanges();
    }


    onClick() {
        if (this.loggedIn()) {
            if (this.likeStatus) {
                this.postService.addLikeToPost(this.post, this.likeStatus).then(() => {


                    this.reloadLikes();
                })
                this.likeStatus = false
            } else {
                this.postService.addLikeToPost(this.post, this.likeStatus).then(() => {
                    this.reloadLikes();
                })
                this.likeStatus = true
            }

        } else {
            alert("You Have to be Logged Iny")
        }

    }


    loadCommentsByPostId() {
        this.postService.getCommentsByPostId(this.post.id).then(comments => {
            this.commentList = comments
        })
    }

    //switch to show CommentForm or not when button is clicked
    toggleCommentForm() {
        this.showCommentForm = !this.showCommentForm;
    }

  // will be called, after the comment is created in the component: comment-form
  handleCommentCreated(newComment: Comment){
    this.commentList.push(newComment);
    this.showCommentForm=false;
    this.loadCommentsByPostId();
  }

  // will show edit-button and delete-button if the logged-in Account has same Id like post.account
  canIEditAndDelete(): boolean{
    const account = this.accountService.getLoginAccount();
    if(account && account.id_account === this.post.account?.id_account){
      return true;
    }else {return false}
  }


  handleDelete(){}




}

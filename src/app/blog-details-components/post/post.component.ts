import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Post} from "../../interfaces/post-interface";
import {CommentComponent} from "../comment/comment.component";
import {PostService} from "../../services/post.service";
import {Comment} from "../../interfaces/comment-interface";
import {CommentFormComponent} from "../comment-form/comment-form.component";
import { ChangeDetectorRef } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {error} from "protractor";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  template: `
    <div class="post">
      <div class="post-user-profil">
          <div class="wrap-img"><img src="{{post.account?.imagePath}}" alt="profil"></div>
          <p>User: {{ post.account?.name }}</p>
          <p> Date: {{timestamp}}</p>
      </div>
      <p class="post-answer">{{ post.answer }}</p>
      <div class="post-blc" >
        <div class="post-blc-buttons" *ngIf="loggedIn()">
            <button type="button" class="comment-button" (click)="toggleCommentForm()" >{{ showCommentForm ? "x Cancel": "+ Comment" }}</button>
            <button type="button" class="edit-button" *ngIf="canIEditAndDelete()" > Edit </button>
            <button type="button" class="delete-button" *ngIf="canIEditAndDelete()" (click)="handleDeleteDifficult()"> Delete </button>
        </div>
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

        <app-comment 
                *ngFor="let comment of commentList" [comment]="comment"
                (deletedComment)="handleCommentDeleted($event)"
        ></app-comment>

  `,
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    @Input() post!: Post;
    @Output() deletedPost = new EventEmitter<number>();
    likeStatus: boolean = true;
    commentList: Comment[] = [];

    showCommentForm: boolean = false;

    timestamp:string | undefined;

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
        this.timestamp =  this.post?.timestamp.replace(/^(\d{4})-(\d{2})-(\d{2})T.*$/, '$3-$2-$1')
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


  handleDeleteDifficult(){
        const firstConfirm = window.confirm("Are you sure you want to delete the answer?");

        if (firstConfirm) {
            const secondConfirm = window.confirm("Are you really really sure?");
            if (secondConfirm){
                const thirdConfirm = window.confirm("Are you really really really sure that you are sure?");
                if(thirdConfirm){
                    const deleted = this.post.id;
                    this.postService.deletePost(deleted).subscribe({next: ()=>{
                        this.deletedPost.emit(this.post.id);
                        console.log("it should be deleted now")
                    }, error: (error) =>{
                        console.log(error);
                    }});
                    console.log(deleted);
                    alert('Post wurde gelöscht, vllt');}
            }
        }
  }

  handleDeleteEasy(){
      const deleted = this.post.id;
      this.postService.deletePost(deleted).subscribe({next: ()=>{
              this.deletedPost.emit(this.post.id);
              console.log("it should be deleted now")
          }, error: (error) =>{
              console.log(error);
          }});
      alert('Post wurde gelöscht, vllt');

  }

  handleCommentDeleted(commentId:number){
        const confirm = window.confirm("Are you sure you want to delete the comment?");
        if (confirm) {this.commentList = this.commentList.filter(comment => comment.id !== commentId);}

  }

}

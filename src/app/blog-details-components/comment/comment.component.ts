import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Comment} from "../../interfaces/comment-interface";
import {AccountService} from "../../services/account.service";
import {PostService} from "../../services/post.service";
import {CommentService} from "../../services/comment.service";
import {error} from "protractor";


@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wrap-comment">
    <div class="comment">
      <div class="comment-user-profil">
          <div class="wrap-img"><img src="{{comment.account?.imagePath}}" alt="abcd"></div>
        <p>{{ comment.account?.name }} </p>
      </div>
      <p class="comment-comment">{{ comment.comment }}</p>
      <div class="buttons" *ngIf="isLoggedIn" >
        <button type="button" class="delete-button" *ngIf="canIEditAndDelete()" (click)="handleDelete()"> Delete </button>
      </div>
    </div>
    </div>

  `,
  styleUrls: ['./comment.component.css']
})
export class CommentComponent{
 @Input() comment!: Comment;
 @Output() deletedComment = new EventEmitter<number>();

 isLoggedIn = this.accountService.isLoggedIn();

 constructor(
     private postService: PostService,
     private accountService: AccountService,
     private commentService: CommentService,
 ) {
 }

  canIEditAndDelete(): boolean {
   const account = this.accountService.getLoginAccount();
   if( account && account.id_account === this.comment.account?.id_account){
     return true;
   }
   else {return false}}


    handleDelete() {
        this.commentService.deleteByID(this.comment.id).subscribe({next: () =>{
                    this.deletedComment.emit(this.comment.id);
                    console.log('should be deleted now')
            }, error:(error) =>{
            console.log(error);}
        }
        )
    }




}
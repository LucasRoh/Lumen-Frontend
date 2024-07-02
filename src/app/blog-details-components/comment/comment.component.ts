import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Comment} from "../../interfaces/comment-interface";
import {AccountService} from "../../services/account.service";
import {PostService} from "../../services/post.service";


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
        <button type="button" class="delete-button" *ngIf="canIEditAndDelete()"> Delete </button>
      </div>
    </div>
    </div>

  `,
  styleUrls: ['./comment.component.css']
})
export class CommentComponent{
 @Input() comment!: Comment;

 isLoggedIn = this.accountService.isLoggedIn();

 constructor(
     private postService: PostService,
     private accountService: AccountService,
 ) {
 }



  canIEditAndDelete(): boolean {
   const account = this.accountService.getLoginAccount();
   if( account && account.id_account === this.comment.account?.id_account){
     return true;
   }
   else {return false}}


}
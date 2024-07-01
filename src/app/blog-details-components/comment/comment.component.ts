import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Comment} from "../../interfaces/comment-interface";


@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wrap-comment">
    <div class="comment">
      <div class="comment-user-profil">
        <img src="../../../assets/images/Profil.png" alt="abcd">
        <p>{{ comment.account?.name }} </p>
      </div>

      <p class="comment-comment">{{ comment.comment }}</p>
    </div>
    </div>

  `,
  styleUrls: ['./comment.component.css']
})
export class CommentComponent  {
 @Input() comment!: Comment;

}

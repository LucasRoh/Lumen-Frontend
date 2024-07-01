import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Comment} from "../../interfaces/comment-interface";
import {Account} from "../../interfaces/account-interface";
import {PostService} from "../../services/post.service";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-comment">
      <form #commentForm="ngForm" (ngSubmit)="handleCommentSubmit(commentForm)">
        <label for="comment">Add a Comment</label>
        <textarea id="comment" name="comment" [(ngModel)]="comment.comment" required ></textarea>
        <div class="validate-meldung" *ngIf="commentForm.form.controls['comment']?.invalid && commentForm.form.controls['comment']?.touched">
          Ya cannot add an empty Comment.
        </div>
        <button type="submit" [disabled]="commentForm.invalid" >Send Comment</button>
      </form>
    </div>
  `,
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
@Input() postId: Number | undefined;
@Output() commentCreated= new EventEmitter<Comment>;

defaultAccount: Account ={
  id_account: 1,
  name: "Banana-MAN",
  password: "1234",
  imagePath: "/assets/images/DefaultAccountImage.png"
};

comment: Comment = {
  id: 0,
  comment: "",
  timestamp: new Date().toISOString(),
  account: this.defaultAccount,
}

constructor(
    private postService: PostService,
) {
}

  async handleCommentSubmit(form: NgForm): Promise<any>{
  if(!this.postId || form.invalid) return;
  try {
    const createdComment= await this.postService.createCommentAsPromised(this.postId, this.comment);
    this.commentCreated.emit(createdComment);
    form.resetForm();
  }catch (error){
    console.log("Uhh try again?, comment couldnt be added")
  }
}




}

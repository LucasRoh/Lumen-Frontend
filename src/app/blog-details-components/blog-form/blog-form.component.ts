import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {Post} from "../../interfaces/post-interface";
import {BlogService} from "../../services/blog.service";
import {Account} from "../../interfaces/account-interface";

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule ],
  template: `
    <div class="create-post">
      <form #postForm="ngForm" (ngSubmit)="handleSubmitAnswer(postForm)">
        <label for="answer"> Answer: </label>
        <textarea id="answer" name="answer"  [(ngModel)]="post.answer" required></textarea>
        <div class="validate-meldung" *ngIf="postForm.form.controls['answer']?.invalid && postForm.form.controls['answer']?.touched">
          Ya need to add an answer first.
        </div>
        <button type="submit" [disabled]="postForm.invalid">Add Answer</button>
      </form>
    </div>
  `,
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent {
  @Input() blogId: Number | undefined;
  @Output() postCreated = new EventEmitter<Post>();

  defaultAccount: Account=     {
    id_account: 5,
    name: "SuperHacker",
    password: "1234",
    imagePath: "/assets/images/DefaultAccountImage.png"
  };
  post: Post ={
    id:0,
    answer : '',
    likes: 0,
    timestamp: new Date().toISOString(),
    account: this.defaultAccount,
  };

  postForm = new FormGroup({
    answer: new FormControl(''),
  })

  constructor(
      private blogService: BlogService,
  ) {
  }

  async handleSubmitAnswer(form: NgForm) : Promise<void> {
    if(!this.blogId || form.invalid) return;
    try {
      const createdPost = await this.blogService.createPostAsPromise(this.blogId, this.post);
      this.postCreated.emit(createdPost);
      form.resetForm();
    }catch (error){
      console.error("Fehler, es geht nicht")
    }
  }



}

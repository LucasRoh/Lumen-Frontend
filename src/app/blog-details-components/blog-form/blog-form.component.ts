import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {Post} from "../../interfaces/post-interface";
import {BlogService} from "../../services/blog.service";
import {Account} from "../../interfaces/account-interface";
import {AccountService} from "../../services/account.service";


@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule ],
  template: `
    <div class="create-post">
      <form #blogForm="ngForm" (ngSubmit)="handleSubmitAnswer(blogForm)">
        <label for="answer"> Add an Answer </label>
        <textarea id="answer" name="answer" [(ngModel)]="post.answer" required></textarea>
        <div class="validate-meldung"
             *ngIf="blogForm.form.controls['answer']?.invalid && blogForm.form.controls['answer']?.touched">
          Ya need to add an answer first.
        </div>
        <button type="submit" [disabled]="blogForm.invalid">Send Answer</button>
      </form>
    </div>
  `,
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent {
  @Input() blogId: Number | undefined;
  @Output() postCreated = new EventEmitter<Post>();

  account: Account={
    id_account: 0,
    name: "",
    password:"",
    imagePath:""
  }
  defaultAccount: Account= {
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
    account: this.account
  };

  constructor(
      private blogService: BlogService,
      private accountService: AccountService,) {
  }

  loadAccountForPost(){
    this.account = this.accountService.getLoginAccount();
    this.post.account = this.account
  }

  public loggedIn(): boolean {
    if (localStorage.getItem("loggedIn") === "true") {
      return true;
    } else {
      return false;
    }
  }

  async handleSubmitAnswer(form: NgForm) : Promise<void> {
    if(!this.blogId || form.invalid) return;
    if(!this.loggedIn()) return ;
    try {
      this.loadAccountForPost()
      const createdPost = await this.blogService.createPostAsPromise(this.blogId, this.post);
      this.postCreated.emit(createdPost);
      form.resetForm();
    }catch (error){
      console.error("Fehler, es geht nicht")
    }
  }



}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Post} from "../../interfaces/post-interface";

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ],
  template: `
    <div class="create-post">
      <form [formGroup]="postForm" >
        <label for="answer"> Answer: </label>
        <textarea id="answer" name="answer"  ]></textarea>
        <button type="submit">Add Answer</button>
      </form>
      
    </div>
  `,
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent {

  post: Post ={
    id:0,
    answer : '',
    likes: 0,
    timestamp: '29-06-2024'
  };

  postForm = new FormGroup({
    answer: new FormControl(''),
  })



}

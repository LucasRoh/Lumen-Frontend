import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Blog} from "../interfaces/blog-interface";
import {BlogService} from "../services/blog.service";
import {async} from "rxjs";
import {TagService} from "../services/tag.service";



@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <main>
      <form (ngSubmit)="handleSubmit()">

        <input class="title" type="text" id="titel" placeholder="Titel" name="title" [(ngModel)]="blog.title">

        <textarea class="textArea" id="text" placeholder="Text" name="text" [(ngModel)]="blog.question"></textarea>


        <input class="tags" type="text" id="tag" placeholder="Tags" name="tags" [(ngModel)]="value">
        
        <img class="submit" [src]=submitURL alt="Submit" (click)="handleSubmit()">
 
        
      </form>
    </main>
    
  `,
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit{

  value: string = "";
  blogs: Blog[] = [];



  submitURL = "/assets/images/Submit.png";

  // createForm: FormGroup = new FormGroup({
  //   Titel: new FormControl(''),
  //   Text: new FormControl(''),
  //   Tags: new FormControl(''),
  //   Submit: new FormControl(''),
  //   Image: new FormControl('')
  // })

  blog: Blog = {
    id: 0,
    title: '',
    question: '',
    timestamp: new Date().toISOString(),
  }


  constructor(private blogService: BlogService, private tagService: TagService) {
  }
  ngOnInit(): void {
    this.loadBlogs();
  }

  handleSubmit() {
    console.log(this.blog);
    this.blogService.createBlog(this.blog, this.value).then(() => {
      console.log(this.value);
      })}


  async loadBlogs() {
    this.blogs = await this.tagService.getAllBlogs();
  }
}

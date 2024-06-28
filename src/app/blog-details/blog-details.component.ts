import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../services/blog.service";
import {Blog} from "../interfaces/blog-interface";
import {Post} from "../interfaces/post-interface";
import {CommentService} from "../services/comment.service";
import {Comment} from "../interfaces/comment-interface";
import {PostService} from "../services/post.service";
import {error} from "protractor";



@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article>
      <section>
        <h1>Here comes the title: {{ blog?.title }}</h1>
        <p>Here comes the Question: {{ blog?.question }}</p>
        <p>This is the Questioner: {{ blog?.account?.name }}</p>
      </section>

       <section *ngIf="postList?.length">
        <ul *ngFor="let post of postList">
            <li>{{post.answer}}</li>
        </ul>
      
        
        <section>
        
          <p>Here is a comment. Currently empty</p>
        </section>
      </section>
      
    </article>

  `,
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit{
  route: ActivatedRoute = inject(ActivatedRoute);
  blogService = inject(BlogService);
  postService = inject(PostService);

  blog: Blog | undefined;

  postList: Post[] | undefined;

  commentList: Comment[] | undefined;

  constructor() {
    const blogId = Number(this.route.snapshot.params['id']);
    this.blogService.getBlogById(blogId).then(blog =>{this.blog = blog});


  }

  ngOnInit(){

  }

  loadPosts(){
    this.blogService.getPostsByBlogId(this.route.snapshot.params['id']).then(
        posts =>{this.postList = posts},
        (error) =>{console.log(error)}
    );
  }

  loadCommentsForPost(){
    this.postList.forEach(post =>{
      this.commentList.
    })

  }



}

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
      <div class="antwort">
        <h2>Frage</h2>
      </div>
      <section>
        <div class="user-profil">
          <img src="../../assets/images/Profil.png">
          <p>User: {{blog?.account?.name}}</p>
        </div>
        <h1>Here comes the title: {{ blog?.title }}</h1>
        <p>Here comes the Question: {{ blog?.question }}</p>
        <p>This are the tags:  still empty now</p>
      </section>
      
      <div class="wrap-button">
        <button type="button" class="post-button">+ Answer</button>
      </div>

      <div class="antwort">
        <h2>Antworten</h2>
      </div>
      
      <div class="wrap-answer" *ngFor="let post of postList">
        <div class="post-listing">
          <div class="user-profil-answer">
            <img src="../../assets/images/Profil.png">
            <p>User: {{post.account?.name}}</p>
          </div>
            <p class="post-answer">{{ post.answer }}</p>
          <div class="post-blc">
            <button type="button" class="comment-button">+ Answer</button>
            <img class="post-likes" src="../../assets/images/Like.png">
            <p> 10</p>
          </div>
        </div>
        
        <div class="comments">
            <div class="comment-listing" *ngFor="let comment of post.comments">
              <div class="user-profil-answer">
                <img src="../../assets/images/Profil.png">
                <p>User: {{comment?.account?.name}} </p>
              </div>
              
              <p class="comment-comment">{{ comment.comment }}</p>
            
              
            </div>
        </div>
        
      </div>
      
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

  testPost: Post = {
    "id": 0,
    "answer": '',
    "comments": []
  }

  constructor() {
  }

  ngOnInit(){
    this.loadBlogs();
    this.loadPostsForBlog();
    this.loadTestPost();
    this.loadCommentsTest()

  }

  loadBlogs(){
    const blogId=Number(this.route.snapshot.params['id']);
    this.blogService.getBlogById(blogId).then(blog =>{
      this.blog = blog
    })
  }

  loadPostsForBlog(){
    this.blogService.getPostsByBlogId(this.route.snapshot.params['id']).then(
        posts =>{this.postList = posts; this.loadCommentsForPost()},
        (error) =>{console.log(error)}
    );
  }

  loadCommentsForPost(): void {
    this.postList?.forEach(post =>{
      this.postService.getCommentsByPostId(post.id).then( comments =>{
        post.comments = comments;
      }, error =>{ console.log(error)})
    })
  }

  loadCommentsForPosts(){
    if (!this.postList) {
      console.error('postList is undefined');
      return;
    }
    const commentPromises = this.postList.map(post =>
        this.postService.getCommentsByPostId(post.id).then(
            comments => {
              post.comments = comments;
            },
            error => {
              console.error(`Error fetching comments for post ${post.id}:`, error);
              post.comments = [];
            }
        )
    );

    Promise.all(commentPromises).then(() => {
      console.log('All comments loaded');
    }).catch(error => {
      console.error('Error loading all comments:', error);
    });
  }


  loadTestPost(){
    const postId = 1;
    this.postService.getPostById(postId).then(post => this.testPost = post);
  }
  loadCommentsTest(){
    const postId = 1;
    this.postService.getCommentsByPostId(postId).then(comment => this.testPost.comments = comment);
  }



}

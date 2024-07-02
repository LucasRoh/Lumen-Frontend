import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {Blog} from "../../interfaces/blog-interface";
import {Post} from "../../interfaces/post-interface";
import {PostService} from "../../services/post.service";
import {PostComponent} from "../post/post.component";
import {CommentComponent} from "../comment/comment.component";
import {BlogFormComponent} from "../blog-form/blog-form.component";
import {Account} from "../../interfaces/account-interface";
import {AccountService} from "../../services/account.service";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-blog-details',
    standalone: true,
    imports: [CommonModule, PostComponent, CommentComponent, BlogFormComponent, FormsModule],
    template: `
        <article>
            <div class="antwort">
                <h2>Frage</h2>
            </div>
            <section>
                <div class="user-profil">
                    <div class="wrap-img"><img src="{{blog?.account?.imagePath}}" alt="abcd"></div>
                    <p>User: {{ blog?.account?.name }}</p>
                    <p>Date: {{ timestamp }}</p>
                </div>
                <h1>{{ blog?.title }}</h1>
                <p class="question-content">{{ blog?.question }}</p>
                <p>This are the tags: still empty now</p>
            </section>

            <div class="wrap-button" *ngIf="isLoggedIn">
                <button type="button" class="post-button"
                        (click)="togglePostForm()">{{ showBlogForm ? 'x Cancel' : '+ Answer' }}
                </button>
            </div>

            <div>
                <app-blog-form
                        *ngIf="showBlogForm"
                        [blogId]="blog?.id"
                        (postCreated)="handlePostCreated($event)"
                ></app-blog-form>
            </div>

            <div class="antwort">
                <h2>Antworten</h2>
            </div>
            <section id="sortbar">
                <h3>Sort:</h3>
                <div>
                    <input type="radio" name="sortOption"  (change)="sortNewPostById()">
                    <p>New</p>
                </div>
                <div>
                    <input type="radio" name="sortOption"  (change)="sortOldPostsByID()">
                    <p>Old</p>
                </div>
                <div>
                    <input type="radio" name="sortOption"  
                           (change)="sortPostsByLikes()">
                    <p>Likes</p>
                </div>

            </section>

            <div class="wrap-postlist">
                <app-post 
                        *ngFor="let post of postList" [post]="post"
                        (deletedPost)="handleDeletedPost($event)"
                ></app-post>
            </div>

        </article>
    `,
    styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

    blog: Blog | undefined;
    postList: Post[] | undefined;

    blogId: number = Number(this.route.snapshot.params['id']);
    timestamp: string | undefined;

    isLoggedIn = this.accountService.isLoggedIn();

    //only Show Blog Form when User klicks on Answer
    showBlogForm: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private blogService: BlogService,
        private postService: PostService,
        private accountService: AccountService) {}

    ngOnInit() {
        this.loadBlog();
        this.loadPostsForBlog();
    }

    loadBlog() {
        this.blogService.getBlogById(this.blogId).then(blog => {
            this.blog = blog;
            this.timestamp = this.blog?.timestamp.replace(/^(\d{4})-(\d{2})-(\d{2})T.*$/, '$3-$2-$1');})
    }

    loadPostsForBlog() {
        this.blogService.getPostsByBlogId(this.blogId).then(
            posts => {
                this.postList = posts;
                this.sortPostsByLikes();
                this.loadCommentsForPost()
            }, (error) => {
                console.log(error)});
    }

    loadCommentsForPost(): void {
        this.postList?.forEach(post => {
            this.postService.getCommentsByPostId(post.id).then(comments => {
                post.comments = comments;
            }, error => {
                console.log(error)})})
    }

    //to sort Posts by ID
    sortOldPostsByID(){
        if(!this.postList)return
        this.postList.sort((a, b) => a.id -b.id);
    }

    sortNewPostById(){
        if(!this.postList) return
        this.postList.sort((a,b) => b.id -a.id);
    }

    sortPostsByLikes(){
        if(!this.postList) return
        this.postList.sort((a,b) => b.likes -a.likes)
    }

    //switch to true when clicked on button
    togglePostForm(){
        this.showBlogForm = !this.showBlogForm;
    }

    //new Post will be added to postList
    handlePostCreated(newPost: Post){
        this.postList?.push(newPost);
        this.showBlogForm = false;
        this.loadPostsForBlog();
    }


    handleDeletedPost(postId: number){
        this.postList = this.postList?.filter(post => post.id !== postId);
    }
}

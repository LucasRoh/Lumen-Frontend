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

@Component({
    selector: 'app-blog-details',
    standalone: true,
    imports: [CommonModule, PostComponent, CommentComponent, BlogFormComponent],
    template: `
        <article>
            <div class="antwort">
                <h2>Frage</h2>
            </div>
            <section>
                <div class="user-profil">
                    <img src="../../../assets/images/Profil.png" alt="abcd">
                    <p>User: {{ blog?.account?.name }}</p>
                    <p>Date: {{ timestamp }}</p>
                </div>
                <h1>{{ blog?.title }}</h1>
                <p class="question-content">{{ blog?.question }}</p>
                <p>This are the tags: still empty now</p>
            </section>

            <div class="wrap-button" *ngIf="loggedIn()">
                <button type="button" class="post-button"
                        (click)="togglePostForm()">{{ showBlogForm ? 'x Cancel' : '+ Answer' }}
                </button>
            </div>

            <div>
                <app-blog-form
                        *ngIf="showBlogForm"
                        [blogId]="blog?.id"
                        (postCreated)="handlePostCreated($event)"></app-blog-form>
            </div>

            <div class="antwort">
                <h2>Antworten</h2>
            </div>

            <div>
                <app-post *ngFor="let post of postList" [post]="post"></app-post>
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

    //boolean for create answer
    showBlogForm: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private blogService: BlogService,
        private postService: PostService,) {}

    ngOnInit() {
        this.loadBlogs();
        this.loadPostsForBlog();
    }

    public loggedIn(): boolean {
        if (localStorage.getItem("loggedIn") === "true") {
            return true;
        } else {
            return false;
        }
    }

    loadBlogs() {
        this.blogService.getBlogById(this.blogId).then(blog => {
            this.blog = blog;
            this.timestamp = this.blog?.timestamp.replace(/^(\d{4})-(\d{2})-(\d{2})T.*$/, '$3-$2-$1');
        })
    }

    loadPostsForBlog() {
        this.blogService.getPostsByBlogId(this.blogId).then(
            posts => {
                this.postList = posts;
                this.loadCommentsForPost()
            }, (error) => {
                console.log(error)}
        );
    }
    loadCommentsForPost(): void {
        this.postList?.forEach(post => {
            this.postService.getCommentsByPostId(post.id).then(comments => {
                post.comments = comments;
            }, error => {
                console.log(error)
            })
        })
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
}

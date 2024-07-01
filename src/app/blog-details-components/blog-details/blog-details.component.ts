import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {Blog} from "../../interfaces/blog-interface";
import {Post} from "../../interfaces/post-interface";
import {PostService} from "../../services/post.service";
import {PostComponent} from "../post/post.component";
import {CommentComponent} from "../comment/comment.component";

@Component({
    selector: 'app-blog-details',
    standalone: true,
    imports: [CommonModule, PostComponent, CommentComponent],
    template: `
        <article>
            <div class="antwort">
                <h2>Frage</h2>
            </div>
            <section>
                <div class="user-profil">
                    <img src="../../../assets/images/Profil.png" alt="abcd">
                    <p>User: {{ blog?.account?.name }}</p>
                </div>
                <h1>Here comes the title: {{ blog?.title }}</h1>
                <p>Here comes the Question: {{ blog?.question }}</p>
                <p>This are the tags: still empty now</p>
            </section>

            <div class="wrap-button">
                <button type="button" class="post-button">+ Answer</button>
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

    constructor(
        private route: ActivatedRoute,
        private blogService: BlogService,
        private postService: PostService,
    ) {
    }

    ngOnInit() {
        this.loadBlogs();
        this.loadPostsForBlog();

    }

    loadBlogs() {

        this.blogService.getBlogById(this.blogId).then(blog => {
            this.blog = blog
        })
    }

    loadPostsForBlog() {
        this.blogService.getPostsByBlogId(this.blogId).then(
            posts => {
                this.postList = posts;
                this.loadCommentsForPost()
            },
            (error) => {
                console.log(error)
            }
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
}

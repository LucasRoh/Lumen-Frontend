import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {Blog} from "../interfaces/blog-interface";
import {BlogService} from "../services/blog.service";



@Component({
    selector: 'app-blog',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <section class="listing" [routerLink]="['/blogs',blog.id]">
            <div class="account-container">
                <img id="accountImage" [src]="blog.account?.imagePath" alt="User Logo">
                <p class="listing-account">{{ blog.account?.name }}</p>
                <p class="listing-timestamp">{{ timestamp }}</p>
            </div>
            <h2 class="listing-heading">{{ blog.title }}</h2>
            <div class="info-container">
                <img id="answersImage" [src]="commentUrl" alt="Answer Count">
                <p id="postCount">{{ postCount }}</p>
            </div>
        </section>
    `,
    styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {

    commentUrl = "/assets/images/Comment.png";

    postCount: Number = 0;
    timestamp: string | null = "";
    blogService: BlogService = inject(BlogService);

    @Input() thisBlog!: Blog;


    @Input() blog!: Blog;

    constructor() {
    }

    ngOnInit(): void {

        console.log(this.blog)
        console.log(this.blog.account)
        console.log(this.blog.account?.imagePath)
        if (this.blog && this.blog.id) {
            this.blogService.getPostCount(this.blog.id).then((postCount: Number) => {
                this.postCount = postCount;
            });
        }

        this.timestamp = this.blog.timestamp.replace(/^(\d{4})-(\d{2})-(\d{2})T.*$/, '$3-$2-$1');
    }
}
import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { Blog } from "../interfaces/blog-interface";
import {BlogService} from "../services/blog.service";


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
      <section class="listing">
          <div class="account-container">
            <img id="accountImage" [src]="profilUrl" alt="User Logo">
            <p class="listing-account">{{ blog.account?.name }}</p>
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

export class BlogComponent {

  profilUrl = "/assets/images/Profil.png";
  commentUrl = "/assets/images/Comment.png";

  postCount: Number = 0;
  blogService: BlogService = inject(BlogService);

  @Input() thisBlog!: Blog;


  @Input() blog!: Blog;

  constructor() {}

  ngOnInit(): void {
    if (this.blog && this.blog.id) {
      this.blogService.getPostCount(this.blog.id).then((postCount: Number) => {
        this.postCount = postCount;
      });
    }
  }
}
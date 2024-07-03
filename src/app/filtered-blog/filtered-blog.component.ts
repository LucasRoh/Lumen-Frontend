import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from "../services/blog.service";
import { Blog } from "../interfaces/blog-interface";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtered-blog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section *ngFor="let blog of blogsByTag" class="listing">
      <div class="account-container">
        <div class="wrap-img"><img id="accountImage" [src]="blog.account?.imagePath" alt="User Logo"></div>
        <p class="listing-account">{{ blog.account?.name }}</p>
        <p class="listing-timestamp">{{ blog.timestamp }}</p>
      </div>
      <h2 class="listing-heading">{{ blog.title }}</h2>
      <div class="info-container">
        <p>#{{ blog.tag?.title }}</p>
        <img id="answersImage" [src]="commentUrl" alt="Answer Count">
        
      </div>
    </section>
  `,
  styleUrls: ['./filtered-blog.component.css']
})
export class FilteredBlogComponent implements OnInit {
  blogsByTag: Blog[] = [];
  commentUrl = "/assets/images/Comment.png";
  blogService: BlogService = inject(BlogService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const tagId = params['id']; // Corrected the route parameter name to 'id'
      this.loadBlogsByTag(tagId);
    });
  }

  async loadBlogsByTag(tagId: number) {
    this.blogsByTag = await this.blogService.getBlogByTag(tagId);
  }
}
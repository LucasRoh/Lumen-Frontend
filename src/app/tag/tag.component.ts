import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagService } from '../services/tag.service';
import { Blog } from '../interfaces/blog-interface';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="main">
      <div class="tag" *ngFor="let blog of blogs">
        {{ blog.title }}
      </div>
    </main>
  `,
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  async loadBlogs() {
    this.blogs = await this.tagService.getAllBlogs();
  }
}
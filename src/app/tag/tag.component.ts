import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagService } from '../services/tag.service';
import { Blog } from '../interfaces/blog-interface';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="main">
      <a class="tag" *ngFor="let blog of blogs" routerLink="/blogs/tags/{{ blog.title }}">
        {{ blog.title  }}
      </a>
    </main>
  `,
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  blogs: any[] = [];

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  async loadBlogs() {
    this.blogs = await this.tagService.getAllBlogs();
    console.log(this.blogs)
  }
}
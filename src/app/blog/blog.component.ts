import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { Blog } from "../interfaces/blog-interface";


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <h2 class="listing-heading">{{ blog.title }}</h2>
      <a [routerLink]="['/blogs', blog.id]">More</a>
    </section>
  `,
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  @Input() blog!:Blog;
}

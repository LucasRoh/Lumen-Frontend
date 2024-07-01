import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlogDetailsComponent} from "../../blog-details-components/blog-details/blog-details.component";


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, BlogDetailsComponent],
  template: `
    <app-blog-details></app-blog-details>
  `,
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
}

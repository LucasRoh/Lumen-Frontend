import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      blog works!
    </p>
  `,
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

}

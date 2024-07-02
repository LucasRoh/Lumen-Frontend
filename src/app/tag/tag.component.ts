import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      tag works!
    </p>
  `,
  styleUrls: ['./tag.component.css']
})
export class TagComponent {

}

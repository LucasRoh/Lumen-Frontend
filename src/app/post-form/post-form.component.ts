import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      post-form works!
    </p>
  `,
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {

}

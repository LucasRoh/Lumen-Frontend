import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      comment-form works!
    </p>
  `,
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
@Input() postid: Number | undefined;




}

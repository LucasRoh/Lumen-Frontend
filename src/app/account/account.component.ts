import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      account works!
    </p>
  `,
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

}

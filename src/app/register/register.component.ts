import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  template: `
   <form>
     <label>Register</label>
     <input>
     <input>
     <button>Submit</button>
   </form>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

}

import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from "../services/account.service";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <form (ngSubmit)="validate()">
      <input #usernameInput class="Username" placeholder="User Name" type="text" />
      <input #passwordInput placeholder="Passwort" type="password" />
      <button type="submit">Submit</button>
    </form>
  `,
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    @ViewChild('usernameInput') usernameInput!: ElementRef;
    @ViewChild('passwordInput') passwordInput!: ElementRef;

    accountService: AccountService = inject(AccountService);

    constructor() {}

    async validate() {
        const username = this.usernameInput.nativeElement.value.trim();
        const password = this.passwordInput.nativeElement.value.trim();

        try {
            const accounts = await this.accountService.getAllAccounts();
            console.log(accounts);
            const status = accounts.some(account => account.name === username && account.password === password);
            const account = accounts.find(account =>account.name === username && account.password === password);
            console.log(status);
            if(status){
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('account', JSON.stringify(account));
                location.href="/"
                console.log(localStorage.getItem('value'));
            } else {
                console.log("failed")
            }


        } catch (error) {
            console.error('Error fetching accounts', error);
        }
    }
}

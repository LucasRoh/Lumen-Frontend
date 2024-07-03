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
            const account = accounts.find(acc => acc.name === username && acc.password === password);
            const accountObject = accounts.find(account =>account.name === username && account.password === password);


            if (account) {
                localStorage.setItem('userId', String(account.id_account));
                localStorage.setItem('account', JSON.stringify(accountObject));
                location.href = "/"
                console.log(account.id_account);
            }else {
                console.log("failed")
            }
        } catch (error) {
            console.error('Error fetching accounts', error);
        }
    }
}

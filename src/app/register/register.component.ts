import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';
import { Account } from '../interfaces/account-interface';


@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule],
    template: `
        <form (submit)="handleSubmit($event)">
            <label>Register</label>
            <input placeholder="User Name" #usernameInput>
            <input type="password" placeholder="Password" #passwordInput>
            <button type="submit">Submit</button>
        </form>
    `,
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    @ViewChild('usernameInput') usernameInput!: ElementRef;
    @ViewChild('passwordInput') passwordInput!: ElementRef;

    account: Account = {
        id_account: 0,
        name: '',
        password: '',
        blogs: [],
        imagePath: ''
    };

    handleSubmit(event: Event) {
        event.preventDefault();
        const username = this.usernameInput.nativeElement.value.trim();
        const password = this.passwordInput.nativeElement.value.trim();

        this.account.name = username;
        this.account.password = password;
        this.account.imagePath="/assets/images/DefaultAccountImage.png";

        this.accountService.post(this.account).then(() => {
            alert('Registrierung Erfolgreich');
        }).catch(error => {
            console.error('Fehler während registrieren:', error);
            alert('Registrierung Fehler');
        });
    }

    constructor(private accountService: AccountService) {}
}

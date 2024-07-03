import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { Account } from "../interfaces/account-interface";
import { AccountService } from "../services/account.service"; // Import the AccountService

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, RouterLink],
    template: `
        <header>
            <section>
                <img class="header-images" [src]="logoUrl" alt="Logo" id="logo" routerLink="">
                <img class="header-images" [src]="createUrl" alt="Logo" routerLink="blog/create">
                <img class="header-images" [src]="tagsUrl" alt="Logo" routerLink="tags">
            </section>
            <section>
                <img class="header-images" *ngIf="!loggedIn()" [src]="profilUrl" alt="Logo" routerLink="app/login">
               
                <img class="custom-header-images" *ngIf="loggedIn()" [src]="account?.imagePath==null?profilUrl:account?.imagePath" alt="Logo" routerLink= "app/account">
                <img *ngIf="!loggedIn()" class="header-images" [src]="loginUrl" alt="Logo" routerLink="app/register">
                <img *ngIf="loggedIn()" (click)="logout()" class="header-images" [src]="loginUrl" alt="Logo">
            </section>
        </header>
    `,
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    account: Account | undefined;
    logoUrl = "/assets/images/Logo.png";
    createUrl = "/assets/images/Create.png";
    tagsUrl = "/assets/images/Tag.png";
    profilUrl = "/assets/images/DefaultAccountImage.png";
    loginUrl = "/assets/images/Login.png";
    commentUrl = "/assets/images/Comment.png";

    constructor(private accountService: AccountService,
                private router : Router,) { } // Inject AccountService

    async ngOnInit() {
        const userId = localStorage.getItem("userId");
        if (userId) {
            try {
                this.account = await this.accountService.getAccountById(Number(userId));
                console.log(this.account)
            } catch (error) {
                console.error('Error fetching account:', error);
            }
        }
    }

    protected loggedIn(): boolean {
        if (localStorage.getItem("userId") != null) {
            return true;
        } else {
            return false;
        }
    }

    protected logout() {
        localStorage.removeItem("userId");
        localStorage.removeItem("profile");
        localStorage.removeItem('account');
        this.router.navigate(['/'])
    }

}

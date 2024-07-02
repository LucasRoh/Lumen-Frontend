import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink} from "@angular/router";
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
                <img class="header-images" [src]="shopUrl"  alt="Logo" id="shopUrl" routerLink="app/shop">
                <img class="header-images" *ngIf="!loggedIn()" [src]="profilUrl" alt="Logo" routerLink="app/login">
                <img class="header-images" *ngIf="loggedIn()" [src]="profilUrl" alt="Logo" routerLink="app/account">
                <img class="header-images" [src]="loginUrl" alt="Logo">
            </section>
        </header>
    `,
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {

    logoUrl = "/assets/images/Logo.png";
    createUrl = "/assets/images/Create.png";
    tagsUrl = "/assets/images/Tag.png";
    profilUrl = "/assets/images/DefaultAccountImage.png";
    loginUrl = "/assets/images/Login.png";
    shopUrl="/assets/images/shop.png";
    commentUrl = "/assets/images/Comment.png";

    protected loggedIn(): boolean {
        if (localStorage.getItem("loggedIn") === "true") {
            return true;
        } else {
            return false;
        }
    }

    constructor() {
    }

}

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
                <img class="header-images" *ngIf="profileSelection()==4" [src]="profilUrl" alt="Logo" routerLink="app/login">
                <img class="header-images" *ngIf="profileSelection()==0" [src]="profilUrl" alt="Logo" routerLink="app/account">
                <img class="custom-header-images" *ngIf="profileSelection()==1" src="https://i.ytimg.com/vi/tzD9OxAHtzU/oar2.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLAROSJukM30CxCMoacqsDFlBWSpnA" alt="Logo" routerLink="app/account">
                <img class="custom-header-images" *ngIf="profileSelection()==2" src="https://cdn.unitycms.io/images/1H-QVquEqm0AiozooN6LlE.jpg?op=ocroped&val=1200,1200,1000,1000,0,0&sum=xB-n5ww5X7c" alt="Logo" routerLink="app/account">
                <img class="custom-header-images" *ngIf="profileSelection()==3 " src="https://www.ajc.org/sites/default/files/inline-images/Term%208%20-%20Pepe%20the%20FrogInline-300xflex.jpg" alt="Logo" routerLink="app/account">
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
    commentUrl = "/assets/images/Comment.png";



    protected profileSelection(): Number {
        if (localStorage.getItem("profile") === "SkibidiToilet") {
            return 1;
        } else if (localStorage.getItem("profile") === "WomanWhoKnows") {
            return 2;
        } else if (localStorage.getItem("profile") === "Pepe") {
            return 3;
        } else if(localStorage.getItem("userId") === null) {
            return 4;
        } else {
            return 0;
        }
    }

    constructor() {
    }

}

import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  template: `
    <header>
      <section>
        <img class="header-images" [src]="logoUrl" alt="Logo" id="logo">
        <img class="header-images" [src]="createUrl" alt="Logo" routerLink="blogs/create">
        <img class="header-images" [src]="tagsUrl" alt="Logo" >
      </section>
      <section>
        <img class="header-images" [src]="profilUrl" alt="Logo" >
        <img class="header-images" [src]="loginUrl" alt="Logo" >
      </section>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  logoUrl = "/assets/images/Logo.png";
  createUrl = "/assets/images/Create.png";
  tagsUrl = "/assets/images/Tag.png";
  profilUrl = "/assets/images/Profil.png";
  loginUrl = "/assets/images/Login.png";
  commentUrl = "/assets/images/Comment.png";


  constructor() {
  }
}

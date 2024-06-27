import { Component } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from "@angular/router";
import {BlogComponent} from "./blog/blog.component";

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <main>
        <app-header/>
        <app-home/>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent, HeaderComponent, RouterModule, BlogComponent]
})
export class AppComponent {
  title = 'homes';
}

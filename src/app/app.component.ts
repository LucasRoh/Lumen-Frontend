import { Component } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <main>
        <app-header></app-header>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent, HeaderComponent, RouterModule]
})
export class AppComponent {
  title = 'homes';
}

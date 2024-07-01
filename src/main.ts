import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from "@angular/router";
import routeConfig from "../routes";
import {HttpClientModule} from "@angular/common/http";

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routeConfig),
        HttpClientModule
    ]
})
    .catch(err => console.error(err));

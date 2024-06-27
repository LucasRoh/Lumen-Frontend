import { Routes} from "@angular/router";
import { HomeComponent } from "./src/app/home/home.component";
import { BlogDetailsComponent } from "./src/app/blog-details/blog-details.component";

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'details/:id',
        component: BlogDetailsComponent,
        title: 'Details Page'
    }
];

export default routeConfig;
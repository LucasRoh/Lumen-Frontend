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
        path: 'blog/:id',
        component: BlogDetailsComponent,
        title: 'Blogdetails Page'
    }
];

export default routeConfig;
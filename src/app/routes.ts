import { Routes} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { BlogDetailsComponent } from "./blog-details/blog-details.component";

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'blogs/:id',
        component: BlogDetailsComponent,
        title: 'Blogdetails Page'
    }
];

export default routeConfig;
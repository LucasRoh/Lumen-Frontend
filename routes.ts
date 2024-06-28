import { Routes} from "@angular/router";
import { HomeComponent } from "./src/app/home/home.component";
import { BlogDetailsComponent } from "./src/app/blog-details/blog-details.component";
import {PostFormComponent} from "./src/app/post-form/post-form.component";

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
    },
    {
        path: 'blog/create',
        component: PostFormComponent,
        title: 'Create Blog Page'

    }
];

export default routeConfig;
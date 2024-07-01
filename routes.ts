import {Routes} from "@angular/router";
import {HomeComponent} from "./src/app/home/home.component";
import {PostFormComponent} from "./src/app/post-form/post-form.component";
import {DetailComponent} from "./src/app/pages/detail/detail.component";
import {BlogFormComponent} from "./src/app/blog-details-components/blog-form/blog-form.component";

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'blogs/:id',
        component: DetailComponent,
        title: 'Blogdetails Page'
    },
    {
        path: 'blogs/create',
        component: PostFormComponent,
        title: 'Create Blog Page',
    },
    {
        path: 'blogs/:id/post',
        component: BlogFormComponent,
    }
];

export default routeConfig;
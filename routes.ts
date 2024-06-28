import {Routes} from "@angular/router";
import {HomeComponent} from "./src/app/home/home.component";
// import {BlogDetailsComponent} from "./src/app/blog-details-components/blog-details/blog-details.component";
import {PostFormComponent} from "./src/app/post-form/post-form.component";
import {DetailComponent} from "./src/app/pages/detail/detail.component";

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
    }
];

export default routeConfig;
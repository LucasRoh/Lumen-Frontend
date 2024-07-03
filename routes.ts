import {Routes} from "@angular/router";
import {HomeComponent} from "./src/app/home/home.component";
import {PostFormComponent} from "./src/app/post-form/post-form.component";
import {DetailComponent} from "./src/app/pages/detail/detail.component";
import {BlogFormComponent} from "./src/app/blog-details-components/blog-form/blog-form.component";
import {AccountComponent} from "./src/app/account/account.component";
import {LoginComponent} from "./src/app/login/login.component";
import {TagComponent} from "./src/app/tag/tag.component";
import {RegisterComponent} from "./src/app/register/register.component";

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
        path: 'blog/create',
        component: PostFormComponent,
        title: 'Create Blog Page'

    },
    {
        path: 'app/login',
        component: LoginComponent,
        title: 'Login Page'
    },
    {
        path: 'app/account',
        component: AccountComponent,
        title: 'Account Page',
    },
    {
        path: 'blogs/:id/post',
        component: BlogFormComponent,
    }, {
        path: 'tags',
        component: TagComponent,
        title: 'Tag Page'

    },{
        path:'app/register',
        component: RegisterComponent,
        title: 'Register Page'
    }];

export default routeConfig;
import {Routes} from "@angular/router";
import {HomeComponent} from "./src/app/home/home.component";
import {PostFormComponent} from "./src/app/post-form/post-form.component";
import {DetailComponent} from "./src/app/pages/detail/detail.component";
import {BlogFormComponent} from "./src/app/blog-details-components/blog-form/blog-form.component";
import {AccountComponent} from "./src/app/account/account.component";
import {ShopComponent} from "./src/app/shop/shop.component";
import {LoginComponent} from "./src/app/login/login.component";

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
        path: 'app/shop',
        component: ShopComponent,
        title: 'Shop Page'
    },
    {
        path: 'app/account',
        component: AccountComponent,
        title: 'Account Page',
    },
    {
        path: 'blogs/:id/post',
        component: BlogFormComponent,
    }
];

export default routeConfig;
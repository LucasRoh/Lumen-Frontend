import {Routes} from "@angular/router";
import {HomeComponent} from "./src/app/home/home.component";
import {BlogDetailsComponent} from "./src/app/blog-details/blog-details.component";
import {PostFormComponent} from "./src/app/post-form/post-form.component";
import {LoginComponent} from "./src/app/login/login.component";
import {ShopComponent} from "./src/app/shop/shop.component";
import {AccountComponent} from "./src/app/account/account.component";

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
    },
    {
        path: 'blogs/create',
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
        title: 'Account Page'
    }
];

export default routeConfig;
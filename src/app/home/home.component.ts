import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogService} from "../services/blog.service";
import {BlogComponent} from "../blog/blog.component";
import {Blog} from "../interfaces/blog-interface";


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, BlogComponent],
    template: `
        <section id="searchbar">
            <form>
                <input type="text" placeholder="Filter" #filter>
                <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
            </form>
        </section>
        <section class="results">

            <app-blog *ngFor="let blog of filteredBlogList" [blog]="blog">

            </app-blog>
        </section>
    `,
    styleUrls: ['./home.component.css']
})

export class HomeComponent {
    blogList: Blog[] = [];
    blogService: BlogService = inject(BlogService);
    filteredBlogList: Blog[] = [];

    constructor() {
        this.blogService.getAllBlogs().then((blogList: Blog[]) => {
            this.blogList = blogList;
            this.filteredBlogList = blogList;
        })
    }

    filterResults(text: string) {
        if (!text) this.filteredBlogList = this.blogList;

        this.filteredBlogList = this.blogList.filter(
            blog => blog?.title.toLowerCase().includes(text.toLowerCase())
        );
    }
}

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
        <div id="searchContainer">
            <section id="searchbar">
                <form>
                    <img id="lupeImage" [src]="lupeUrl" alt="Search Button" (click)="filterResults(filter.value)">
                    <input type="text" placeholder="Search" #filter>
                </form>
            </section>
        </div>
        <section id="results">
            <app-blog *ngFor="let blog of filteredBlogList" [blog]="blog"/>
        </section>
    `,
    styleUrls: ['./home.component.css']
})

export class HomeComponent {

    lupeUrl = "/assets/images/Lupe.png";

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

import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogService} from "../services/blog.service";
import {BlogComponent} from "../blog/blog.component";
import {Blog} from "../interfaces/blog-interface";
import {FormsModule} from "@angular/forms";


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, BlogComponent, FormsModule],
    template: `
        <div id="myContainer">

            <div id="searchContainer">
                <section id="searchbar">
                    <form>
                        <img id="lupeImage" [src]="lupeUrl" alt="Search Button" (click)="filterResults(filter.value)">
                        <input type="text" placeholder="Search" #filter (input)="onEnter($event, filter.value)">
                    </form>
                </section>
                <section id="sortbar">
                    <h3>Sort:</h3>
                    <div>
                        <input type="radio" name="sortOption" [(ngModel)]="sortOption" value="title" (change)="sortByTitle()">
                        <p>Title</p>
                    </div>
                    
                    <div>
                        <input type="radio" name="sortOption" [(ngModel)]="sortOption" value="timestamp"
                               (change)="sortByTimestamp()">
                        <p>Timestamp</p>
                    </div>

                </section>
            </div>
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
    sortOption: string = 'title';

    constructor() {
        this.blogService.getAllBlogs().then((blogList: Blog[]) => {
            this.blogList = blogList;
            this.sortByTitle();
            this.filteredBlogList = blogList;
        })
    }



    filterResults(text: string) {
        if (!text) this.filteredBlogList = this.blogList;

        this.filteredBlogList = this.blogList.filter(
            blog => blog?.title.toLowerCase().includes(text.toLowerCase())
        );
    }

    onEnter(event: Event, searchTerm: string): void {
        event.preventDefault();
        this.filterResults(searchTerm);
    }

    sortByTitle(): void {
        this.blogList.sort((a, b) => a.title.localeCompare(b.title));
    }

    sortByTimestamp(): void {
        this.blogList.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }


    protected readonly onchange = onchange;
}

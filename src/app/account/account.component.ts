import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountService} from "../services/account.service";
import {PostService} from "../services/post.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [CommonModule],
    template: `
        <p>
            <label>You have {{ likes }} Likes</label>
            </p>
        <form>
            <label>Select Your Profile Picture</label>
            <img class="profilePicture" src="https://i.ytimg.com/vi/tzD9OxAHtzU/oar2.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLAROSJukM30CxCMoacqsDFlBWSpnA">
            <label>free</label>
            <img class="profilePicture" src="https://cdn.unitycms.io/images/1H-QVquEqm0AiozooN6LlE.jpg?op=ocroped&val=1200,1200,1000,1000,0,0&sum=xB-n5ww5X7c">
            <label>5 Likes</label>
            <img class="profilePicture" src="https://www.ajc.org/sites/default/files/inline-images/Term%208%20-%20Pepe%20the%20FrogInline-300xflex.jpg">
            <label>10 Likes</label>
        </form>
        
        <button type="button" (click)="logOut()">Log Out</button>
        
    `,
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    likes: number = 0;

    constructor(private postService: PostService,
    private accountService: AccountService,
                private router: Router) {
    }

    ngOnInit() {
        this.postService.countLikesForUser(1)
            .subscribe((result) => {
                this.likes = result;
            })
    }

    logOut(){
        this.accountService.logOut()
        this.router.navigate(['/'])
    }


}

import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountService} from "../services/account.service";
import {PostService} from "../services/post.service";

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
            <img class="profilePicture" (click)="skibidiToiletProfile()" src="https://i.ytimg.com/vi/tzD9OxAHtzU/oar2.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLAROSJukM30CxCMoacqsDFlBWSpnA">
            <label>free</label>
            <img class="profilePicture" (click)="WomanWhoKnowsProfile()" src="https://cdn.unitycms.io/images/1H-QVquEqm0AiozooN6LlE.jpg?op=ocroped&val=1200,1200,1000,1000,0,0&sum=xB-n5ww5X7c">
            <label>5 Likes</label>
            <img class="profilePicture" (click)="PePeProfile()" src="https://www.ajc.org/sites/default/files/inline-images/Term%208%20-%20Pepe%20the%20FrogInline-300xflex.jpg">
            <label>10 Likes</label>
        </form>
    `,
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    likes: number = 0;

    constructor(private postService: PostService) {
    }

    ngOnInit() {
        this.postService.countLikesForUser(1)
            .subscribe((result) => {
                this.likes = result;
            })
    }
    protected skibidiToiletProfile(){

        localStorage.removeItem("profile")
        localStorage.setItem("profile","SkibidiToilet")
    }
    protected WomanWhoKnowsProfile(){
        if(this.likes >= 5) {
            localStorage.removeItem("profile")
            localStorage.setItem("profile", "WomanWhoKnows")
        }else{
            alert("You need more Likes")
            }
        }

    protected PePeProfile(){
        if(this.likes >= 10) {
            localStorage.removeItem("profile")
            localStorage.setItem("profile", "Pepe")
        }else{
            alert("You need more Likes")
        }
    }


}

import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Post} from "../../interfaces/post-interface";
import {CommentComponent} from "../comment/comment.component";
import {PostService} from "../../services/post.service";
import {Comment} from "../../interfaces/comment-interface";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, CommentComponent],
  template: `
    <div class="post">
      <div class="post-user-profil">
        <img src="../../../assets/images/Profil.png" alt="profil">
        <p>User: {{ post.account?.name }}</p>
      </div>
      <p class="post-answer">Hier kommt die Antwort: {{ post.answer }}</p>
      <div class="post-blc">
        <button type="button" class="comment-button">+ Answer</button>
        <img class="post-likes" src="../../../assets/images/Like.png" alt="abcd" (click)="onClick()">
        <p> {{post.likes}}</p>
      </div>
    </div>
    <app-comment *ngFor="let comment of commentList" [comment]="comment"></app-comment>
  `,
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input() post!: Post;
  likeStatus : boolean = true;
  commentList: Comment[] = [];

  constructor(
      private postService: PostService,
        private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public loggedIn(): boolean {
    if (localStorage.getItem("loggedIn") === "true") {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit(): void {

    this.loadCommentsByPostId()
  }
  async reloadLikes() {
    const updatedPost = await this.postService.getPostById(this.post.id);
    this.post.likes = updatedPost.likes;
    this.changeDetectorRef.detectChanges();
  }


  onClick(){
    if(this.loggedIn()){
    if(this.likeStatus){
    this.postService.addLikeToPost(this.post, this.likeStatus).then(() => {



    this.reloadLikes();
    })
      this.likeStatus = false}
    else {
      this.postService.addLikeToPost(this.post, this.likeStatus).then(() => {
        this.reloadLikes();
      })
      this.likeStatus = true
    }

  }else{
  alert("You Have to be Logged Iny")
}

}



  loadCommentsByPostId(){
    this.postService.getCommentsByPostId(this.post.id).then(comments => {
      this.commentList = comments
    })
  }


}

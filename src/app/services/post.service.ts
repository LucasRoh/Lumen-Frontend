import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, throwError, mergeMapTo} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Post} from "../interfaces/post-interface";
import {Comment} from "../interfaces/comment-interface";


@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'http://localhost:8080/posts'

  constructor(private http: HttpClient) {
  }

  async getAllPosts(): Promise<Post[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getPostById(id: number): Promise<Post> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  async getCommentsByPostId(id: number): Promise<Comment[]> {
    const data = await fetch(`${this.url}/${id}/comments`)
    return await data.json() ?? [];
  }

  createPost(post: Post) {
    return this.http.post(this.url, post)
  }

  createCommentByPostId(postId: Number, comment:Comment) : Observable<any>{
    const commenturl = `${this.url}/${postId}/comment`
    return this.http.post<Comment>(commenturl, comment)
  }

  async createCommentAsPromised(postId: Number, comment: Comment): Promise<Comment>{
    return lastValueFrom(this.createCommentByPostId(postId, comment))
  }


  private handleError(error: HttpErrorResponse) {
    console.error('Error posting data:', error);
    return throwError(() => new Error('Failed to post data, please try again later.'));
  }

  async addLikeToPost(post: Post, boolean: boolean): Promise<void> {
    await fetch(`${this.url}/${post.id}/likes?isLike=${boolean}`, {
      method: 'PUT',
    })
  }

  countLikesForUser(userId: number): Observable<any> {
    // TODO load user-id from logged-in user
    return this.http.get(`${this.url}/user/${userId}/likes`)
  }

  deletePost(postId: number) : Observable<void> {
    const url = `${this.url}/${postId}`;
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'})
    return this.http.delete<void>(url, {headers})
  }

  async deletePostById(id: number) {
    const data = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
    return
  }


}


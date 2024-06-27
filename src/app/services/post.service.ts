import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Post} from "../interfaces/post-interface";
import {Comment} from "../interfaces/comment-interface";


@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'http://localhost:8080/posts'

  constructor(private http: HttpClient) { }

  async getAllPosts() : Promise<Post[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getPostById(id: number) : Promise<Post> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  async getCommentsByPostId(id: number): Promise<Comment[]>{
    const data = await fetch(`${this.url}/${id}/comments`)
    return await data.json() ?? [];
  }

  createPost(post : Post) {
    return this.http.post(this.url, post)
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error posting data:', error);
    return throwError(() => new Error('Failed to post data, please try again later.'));
  }





}

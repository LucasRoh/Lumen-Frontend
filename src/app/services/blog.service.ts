import { Injectable } from '@angular/core';
import {Blog} from "../interfaces/blog-interface";
import {Post} from "../interfaces/post-interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, lastValueFrom, Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})

export class BlogService {

  url = 'http://localhost:8080/blogs'



  constructor(
      private http: HttpClient,
  ) { }

  async getAllBlogs() : Promise<Blog[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
  async getBlogByTag(id : number) : Promise<Blog[]> {
    const data = await fetch(`${this.url}/tag/${id}`);
    return await data.json() ?? [];
  }

  async getPostCount(id: Number) : Promise<Number> {
    const data = await fetch(`${this.url}/count/${id}`);
    return await data.json() ?? {};
  }

  async getBlogById(id: Number) : Promise<Blog | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }
  async createBlog(blog: Blog, value : string): Promise<void> {
    await fetch(`${this.url}/create/${value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blog)
    })
  }

  async getPostsByBlogId(id: Number) : Promise<Post[] | undefined> {
    const postsdata = await fetch(`${this.url}/${id}/posts`);
    return await postsdata.json() ?? [];
  }

  createPostByBlogId(id: Number, post: Post): Observable<Post>{
    const url = `${this.url}/${id}/post`;
    return this.http.post<Post>(url, post)
}
  async createPostAsPromise(blogId: Number, post: Post) : Promise<Post>{
    return lastValueFrom(this.createPostByBlogId(blogId, post));
  }



}

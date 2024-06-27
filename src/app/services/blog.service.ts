import { Injectable } from '@angular/core';
import {Blog} from "../interfaces/blog-interface";
import {Post} from "../interfaces/post-interface";


@Injectable({
  providedIn: 'root'
})

export class BlogService {

  url = 'http://localhost:8080/blogs'

  constructor() { }

  async getAllBlogs() : Promise<Blog[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getBlogById(id: Number) : Promise<Blog | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  async getPostsByBlogId(id: Number) : Promise<Post[] | undefined> {
    const postsdata = await fetch(`${this.url}/${id}/posts`);
    return await postsdata.json() ?? [];
  }

}

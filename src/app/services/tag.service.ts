import { Injectable } from '@angular/core';
import {Blog} from "../interfaces/blog-interface";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  url = 'http://localhost:8080/tags'

  constructor() { }

  async getAllBlogs() : Promise<Blog[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

}

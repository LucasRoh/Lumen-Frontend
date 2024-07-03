import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  baseurl: string = "http://localhost:8080/comments";

  deleteByID(id: number) : Observable<void> {
    const deleteUrl = `${this.baseurl}/${id}`;
    return this.http.delete<void>(deleteUrl);
  }

}

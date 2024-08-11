import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostI[]> {
    return this.http.get<PostI[]>(this.apiUrl);
  }
}

export interface PostI {
  userId: number;
  id: number;
  title: string;
  body: string;
}

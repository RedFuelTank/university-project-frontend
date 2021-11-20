import { Injectable } from '@angular/core';
import {Author} from "./author";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private static REST_API_SERVER = "/api";


  constructor(private http: HttpClient) { }

  public getAuthor(id: number) {
    return this.http.get<Author>(AuthorsService.REST_API_SERVER + '/users/' + id);
  }
}

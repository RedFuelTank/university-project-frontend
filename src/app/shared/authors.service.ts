import { Injectable } from '@angular/core';
import {Author} from "./author";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  public authors: Author[] = [];

  constructor(private http: HttpClient) { }
}

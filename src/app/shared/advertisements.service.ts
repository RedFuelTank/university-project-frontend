import { Injectable } from '@angular/core';
import {Advertisement} from "./advertisement";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementsService {
  public advertisements: Advertisement[] = []

  constructor(private http: HttpClient) { }
}

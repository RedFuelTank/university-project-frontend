import { Injectable } from '@angular/core';
import {Advertisement} from "./advertisement";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementsService {
  private static REST_API_SERVER = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  public getOffers() {
    return this.http.get<Advertisement[]>(AdvertisementsService.REST_API_SERVER + '/offers');
  }

  public getRequests() {
    return this.http.get<Advertisement[]>(AdvertisementsService.REST_API_SERVER + '/requests');
  }
}

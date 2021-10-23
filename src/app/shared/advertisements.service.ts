import { Injectable } from '@angular/core';
import {Advertisement} from "./advertisement";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementsService {
  private static REST_API_SERVER = "http://localhost:4200/api";

  constructor(private http: HttpClient) { }

  public getOffers() {
    return this.http.get<Advertisement[]>(AdvertisementsService.REST_API_SERVER + '/offers');
  }

  public getRequests() {
    return this.http.get<Advertisement[]>(AdvertisementsService.REST_API_SERVER + '/requests');
  }

  public getOffer(id: number) {
    return this.http.get<Advertisement>(AdvertisementsService.REST_API_SERVER + '/offers/' + id);
  }

  public getRequest(id: number) {
    return this.http.get<Advertisement>(AdvertisementsService.REST_API_SERVER + '/requests/' + id);
  }


  public postOffer(advertisement: Advertisement) {
    this.http.post<any>(AdvertisementsService.REST_API_SERVER + '/offers', advertisement).subscribe();
  }

  public postRequest(advertisement: Advertisement) {
    this.http.post<any>(AdvertisementsService.REST_API_SERVER + '/requests', advertisement).subscribe();
  }
}

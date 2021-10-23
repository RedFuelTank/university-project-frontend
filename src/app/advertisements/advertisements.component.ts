import { Component, OnInit } from '@angular/core';
import {Advertisement} from "../shared/advertisement";
import {AdvertisementsService} from "../shared/advertisements.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css']
})
export class AdvertisementsComponent implements OnInit {
  public advertisements: Advertisement[] = [];
  public advertisementsOnPage: Advertisement[] = [];
  currentState: string = "";
  public currentPage : number = 1;

  constructor(private service: AdvertisementsService, private activatedRoute: ActivatedRoute, private route: Router) {
  }

  goToAdvertisementFormPage(){
    this.route.navigate(['/advertisement-form']);
  }

  getUrl(ad: Advertisement) {
    this.route.navigate(["/" + this.currentState + "/" + ad.id]);
  }

  ngOnInit(): void {
    this.loadAdvertisements();
  }

  public loadAdvertisements() {
    this.activatedRoute.url.subscribe((url) => {
      if (url.join("").toString().includes("requests")) {
        this.currentState = "requests";
        this.loadRequests(this.currentPage);
      } else {
        this.currentState = "offers";
        this.loadOffers(this.currentPage);
      }
    })
  }

  public loadOffers(page : number) {
    this.service.getOffers().subscribe(advertisement => this.advertisements = advertisement);
    this.service.getOfferPage(page).subscribe(advertisement => this.advertisementsOnPage = advertisement);
  }

  public loadRequests(page : number) {
    this.service.getRequests().subscribe(advertisement => this.advertisements = advertisement);
    this.service.getRequestPage(page).subscribe(advertisement => this.advertisementsOnPage = advertisement);
  }
}

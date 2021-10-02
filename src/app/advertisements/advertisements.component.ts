import { Component, OnInit } from '@angular/core';
import {Advertisement} from "../shared/advertisement";
import {AdvertisementsService} from "../shared/advertisements.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css']
})
export class AdvertisementsComponent implements OnInit {
  public advertisements: Advertisement[] = [{authorId: 0, title: "something", id: 123, description: "afodaisjdkasod"}, {authorId: 0, title: "something", id: 123, description: "afodaisjdkasod"}, {authorId: 0, title: "something", id: 123, description: "afodaisjdkasod"}];

  constructor(private service: AdvertisementsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((url) => {
      if (url.join("").endsWith("requests")) {
        this.loadRequests();
      } else {
        this.loadOffers();
      }
    })
  }

  public loadOffers() {
    this.service.getOffers().subscribe(advertisement => this.advertisements = advertisement);
  }

  public loadRequests() {
    this.service.getRequests().subscribe(advertisement => this.advertisements = advertisement);
  }

}

import { Component, OnInit } from '@angular/core';
import {Advertisement} from "../shared/advertisement";
import {AdvertisementsService} from "../shared/advertisements.service";

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css']
})
export class AdvertisementsComponent implements OnInit {
  public advertisements: Advertisement[] = [];

  constructor(private service: AdvertisementsService) { }

  ngOnInit(): void {
  }

  public loadOffers() {
    this.service.getOffers().subscribe(advertisement => this.advertisements = advertisement);
  }

  public loadRequests() {
    this.service.getRequests().subscribe(advertisement => this.advertisements = advertisement);
  }

}

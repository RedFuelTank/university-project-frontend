import {Component, OnInit} from '@angular/core';
import {AdvertisementsService} from "../shared/advertisements.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Advertisement} from "../shared/advertisement";

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css']
})
export class PosterComponent implements OnInit {
  advertisement: Advertisement | undefined;
  id: number | undefined;
  private subscription: Subscription;
  zoom = 14;

  constructor(private service: AdvertisementsService, private route: ActivatedRoute) {
    this.subscription = route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      const fullUrl = url.join("").toString();
      if (fullUrl.includes("requests") && this.id) {
        this.service.getRequest(this.id).subscribe(ad => this.advertisement = ad);
      } else if (fullUrl.includes("offers") && this.id) {
        this.service.getOffer(this.id).subscribe(ad => this.advertisement = ad);
      }
    })
  }

  getAuthorUrl(): string {
    return "/authors/" + this.advertisement?.authorId;
  }

}

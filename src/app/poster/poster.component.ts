import {Component, OnInit} from '@angular/core';
import {AdvertisementsService} from "../shared/advertisements.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Advertisement} from "../shared/advertisement";
import {LoginResponse} from "../model/login-response";
import {AuthenticationService} from "../authentication.service";

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

  constructor(private service: AdvertisementsService,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService : AuthenticationService ) {
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

  public get getCurrentValue(): LoginResponse | undefined {
    return this.authenticationService.getCurrentUserValue
  }

  delete(): void {
    if (window.location.href.includes("requests") && this.id) {
      console.log("request");
      this.service.deleteRequest(this.id);
      this.router.navigate(["/requests"]).then();
    } else if (window.location.href.includes("offers") && this.id) {
      console.log("offer");
      this.service.deleteOffer(this.id);
      this.router.navigate(["/offers"]).then();
    }
  }
}

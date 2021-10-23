import {Component, OnInit} from '@angular/core';
import {AuthorsService} from "../shared/authors.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Author} from "../shared/author";
import {AdvertisementsService} from "../shared/advertisements.service";
import {Advertisement} from "../shared/advertisement";


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  author: Author | undefined;
  id: number | undefined;
  private subscription: Subscription;

  offers: Advertisement[] | undefined;
  requests: Advertisement[] | undefined;

  constructor(private service: AuthorsService, private advertisementService: AdvertisementsService, private route: ActivatedRoute) {
    this.subscription = route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    if (this.id){
      this.service.getAuthor(this.id).subscribe(author => this.author = author);
      this.advertisementService.getOfferByAuthorId(this.id).subscribe(ads => this.offers = ads);
      this.advertisementService.getRequestByAuthorId(this.id).subscribe(ads => this.requests = ads);
    }
  }

  getOfferLink(ad: Advertisement): string {
    return "/offers/" + ad.id;
  }

  getRequestLink(ad: Advertisement): string {
    return "/requests/" + ad.id;
  }
}

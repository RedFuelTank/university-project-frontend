import {Component, OnInit} from '@angular/core';
import {AdvertisementsService} from "../shared/advertisements.service";
import {Advertisement} from "../shared/advertisement";

@Component({
  selector: 'app-advertisement-form',
  templateUrl: './advertisement-form.component.html',
  styleUrls: ['./advertisement-form.component.css']
})
export class AdvertisementFormComponent implements OnInit {
  advertisement: Advertisement = {
    id: 0,
    title: "",
    description: "",
    authorId: 1,
    authorUsername: "",
    authorEmail: "",
    authorPhoneNumber: "",
    name: ""
  }
  isOffer: number = 0;

  constructor(private service: AdvertisementsService) {

  }

  ngOnInit(): void {
  }

  public submit() {
    if (this.isOffer === 1) {
      this.service.postOffer(this.advertisement);
    } else if (this.isOffer === -1) {
      this.service.postRequest(this.advertisement);
    }
    console.log(this.advertisement);
  }

}

import {Component, OnInit} from '@angular/core';
import {AdvertisementsService} from "../shared/advertisements.service";
import {Advertisement} from "../shared/advertisement";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  lat = 59.3989877;
  lng = 23.905469;

  myForm: FormGroup = new FormGroup({
    "title": new FormControl(this.advertisement.title, [Validators.required]),
    "description": new FormControl(this.advertisement.description, [Validators.required]),
    "recaptcha": new FormControl(null, Validators.required)
  });

  constructor(private service: AdvertisementsService, private route: Router) {
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      }, (err) => console.log(err), {enableHighAccuracy: true})
    }
  }


  public submit() {
    this.advertisement.title = this.myForm.get("title")?.value;
    this.advertisement.description= this.myForm.get("description")?.value;
    if (this.isOffer === 1) {
      this.service.postOffer(this.advertisement);
    } else if (this.isOffer === -1) {
      this.service.postRequest(this.advertisement);
    }
    console.log(this.advertisement);
    this.route.navigate(["/home"]);
  }

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}

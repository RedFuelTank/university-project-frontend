import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {AdvertisementsService} from "../shared/advertisements.service";
import {Advertisement} from "../shared/advertisement";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MapsAPILoader} from "@agm/core";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

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
    name: "",
    lat: 59.3971249,
    lng: 24.664837,
    address: "",
    startDate: "",
    expirationDate: "",
  }
  isOffer: number = 0;

  zoom = 12;
  datepicker: NgbDateStruct = {day: 0, month: 0, year: 0};

  @ViewChild('search')
  public searchElementRef: ElementRef | undefined;

  myForm: FormGroup = new FormGroup({
    "title": new FormControl(this.advertisement.title, [Validators.required]),
    "description": new FormControl(this.advertisement.description, [Validators.required]),
    "recaptcha": new FormControl(null, Validators.required)
  });

  constructor(private service: AdvertisementsService, private route: Router, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentPosition();

      // @ts-ignore
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          if (place.formatted_address != null) {
            this.advertisement.address = place.formatted_address;
          }
          this.advertisement.lat = place.geometry.location.lat();
          this.advertisement.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.advertisement.lat = position.coords.latitude;
        this.advertisement.lng = position.coords.longitude;
      }, (err) => console.log(err), {enableHighAccuracy: true})
    }
  }

  public submit() {
    this.advertisement.title = this.myForm.get("title")?.value;
    this.advertisement.description = this.myForm.get("description")?.value;
    this.advertisement.expirationDate = this.datepicker.day + "-" + this.datepicker.month + "-" + this.datepicker.year;

    if (this.isOffer === 1) {
      this.service.postOffer(this.advertisement);
    } else if (this.isOffer === -1) {
      this.service.postRequest(this.advertisement);
    }
    console.log(this.advertisement);
    this.route.navigate(["/home"]).then();
  }

  markerDragEnd($event: any) {
    this.advertisement.lat = $event.coords.lat;
    this.advertisement.lng = $event.coords.lng;
  }
}

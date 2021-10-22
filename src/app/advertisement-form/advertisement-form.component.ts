import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {AdvertisementsService} from "../shared/advertisements.service";
import {Advertisement} from "../shared/advertisement";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MapsAPILoader} from "@agm/core";
import Geocoder = google.maps.Geocoder;

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
    lat: 0,
    lng: 0,
    address: "",
  }
  isOffer: number = 0;

  lat = 59.3971249;
  lng = 24.664837;
  address: string = "";
  zoom = 12;
  private geoCoder: Geocoder | undefined;

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
      this.geoCoder = new google.maps.Geocoder;

      // @ts-ignore
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      }, (err) => console.log(err), {enableHighAccuracy: true})
    }
  }

  private setCurrentAddress(lat: number, lng: number) {
    // @ts-ignore
    this.geoCoder.geocode({ 'location': { lat: lat, lng: lng} }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  public submit() {
    this.advertisement.title = this.myForm.get("title")?.value;
    this.advertisement.description = this.myForm.get("description")?.value;
    this.advertisement.lat = this.lat;
    this.advertisement.lng = this.lng;
    this.advertisement.address = this.searchElementRef?.nativeElement;

    if (this.isOffer === 1) {
      this.service.postOffer(this.advertisement);
    } else if (this.isOffer === -1) {
      this.service.postRequest(this.advertisement);
    }
    console.log(this.advertisement);
    this.route.navigate(["/home"]);
  }

  markerDragEnd($event: any) {
    console.log($event.coords);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.setCurrentAddress(this.lat, this.lng);
    console.log(this.address)
  }
}

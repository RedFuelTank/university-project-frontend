import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AuthorsComponent} from './authors/authors.component';
import {AdvertisementsComponent} from './advertisements/advertisements.component';
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './home/home.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { AdvertisementFormComponent } from './advertisement-form/advertisement-form.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    AdvertisementsComponent,
    HomeComponent,
    AdvertisementFormComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
    ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}

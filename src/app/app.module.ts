import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsComponent } from './authors/authors.component';
import { AdvertisementsComponent } from './advertisements/advertisements.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    AdvertisementsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }

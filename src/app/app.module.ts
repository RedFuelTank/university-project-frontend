import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AuthorsComponent} from './authors/authors.component';
import {AdvertisementsComponent} from './advertisements/advertisements.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './home/home.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {AdvertisementFormComponent} from './advertisement-form/advertisement-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  RECAPTCHA_LANGUAGE,
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from "ng-recaptcha";
import {AgmCoreModule} from "@agm/core";
import {PosterComponent} from './poster/poster.component';
import {InterceptorService} from "./shared/interceptor.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { LoginComponent } from './login/login.component';
import {JwtInterceptor} from "./jwt.interceptor";
import {ErrorInterceptor} from "./error.interceptor";
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    AdvertisementsComponent,
    HomeComponent,
    AdvertisementFormComponent,
    PosterComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJtKAucaMs0SbITAtyLHMM5m2XJ7cwIRY',
      language: localStorage && localStorage.gml || 'en', libraries: ['places']
    },),
  ],
  providers: [HttpClientModule,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {siteKey: "6LeeAt8cAAAAAGJaiDt_B6dGxBan-smnQBSzmXm0"} as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: "en",
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}

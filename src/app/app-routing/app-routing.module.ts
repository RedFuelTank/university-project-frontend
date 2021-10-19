import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {AdvertisementsComponent} from "../advertisements/advertisements.component";
import {AdvertisementFormComponent} from "../advertisement-form/advertisement-form.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'offers', component: AdvertisementsComponent},
  { path: 'requests', component: AdvertisementsComponent},
  {path: 'advertisement-form', component: AdvertisementFormComponent},
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {AdvertisementsComponent} from "../advertisements/advertisements.component";
import {AdvertisementFormComponent} from "../advertisement-form/advertisement-form.component";
import {PosterComponent} from "../poster/poster.component";
import {AuthorsComponent} from "../authors/authors.component";
import {LoginComponent} from "../login/login.component";
import {AuthGuard} from "../auth.guard";
import {RegisterComponent} from "../register/register.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'offers', component: AdvertisementsComponent},
  { path: 'requests', component: AdvertisementsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'offers/:id', component: PosterComponent, canActivate: [AuthGuard]},
  { path: 'requests/:id', component: PosterComponent, canActivate: [AuthGuard]},
  { path: 'authors/:id', component: AuthorsComponent, canActivate: [AuthGuard]},
  {path: 'advertisement-form', component: AdvertisementFormComponent, canActivate: [AuthGuard]},
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

import {Component} from '@angular/core';
import {NotificationService} from "./shared/notification.service";
import {LoginResponse} from "./model/login-response";
import {AuthenticationService} from "./authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]

})

export class AppComponent {
  title = 'LORDI';

  constructor(private notifyService : NotificationService,
              private authenticationService : AuthenticationService) { }

  public get getCurrentValue(): LoginResponse | undefined {
    return this.authenticationService.getCurrentUserValue
  }

  public logout() {
    this.authenticationService.logout();
  }

}

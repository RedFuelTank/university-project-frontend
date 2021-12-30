import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {LoginRequest} from "../model/login-request";
import {LoginResponse} from "../model/login-response";
import {UserService} from "../user.service";
import {RegisterRequest} from "../register-request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required],
    });
  }

  public onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value)
    const {username, password, name, surname, email, phoneNumber} = this.registerForm.value
    let registerRequest = new RegisterRequest(username, password, name, surname, email, phoneNumber);
    console.log(registerRequest)

    this.userService.register(registerRequest).subscribe((response: any) => {
      this.router.navigate(["/login"]);
    })
  }
}

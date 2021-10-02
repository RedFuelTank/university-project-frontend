import {Component, OnInit} from '@angular/core';
import {AuthorsService} from "../shared/authors.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  constructor(private service: AuthorsService) {
  }

  ngOnInit(): void {
  }

}

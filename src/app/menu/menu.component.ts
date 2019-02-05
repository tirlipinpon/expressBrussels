import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  goPlaces() {
    this.router.navigate(['/']).then(nav => {
      console.log(nav); // true if navigation is successful
      this.authenticationService.logout();
    }, err => {
      console.log(err) // when there's an error
    });
  }
}

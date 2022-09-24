import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedinUser: string;
  constructor(private alertify: AlertifyService) { }

  ngOnInit() {

  }
  loggedin() {
    this.loggedinUser= localStorage.getItem('UserName');
    return this.loggedinUser;
  }
  OnLogout() {
    localStorage.removeItem('UserName');
    localStorage.removeItem('token');
    this.alertify.success('You Are Logged Out Successfully !')
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private alertify: AlertifyService,
        private route:Router) { }

  ngOnInit() {
  }
  onLogin(loginForm: NgForm) {
    console.log(loginForm.value);
    const token = this.authService.authUser(loginForm.value);
    if (token) {
      localStorage.setItem('token',token.userName)
      // console.log('ok');
      this.alertify.success('login successfully');
      this.route.navigate(['/'])
    } else {
      // console.log('no')
      this.alertify.error('login not successfully');
    }
  }
}

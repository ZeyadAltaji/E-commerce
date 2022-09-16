import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { UserForLogin } from 'src/app/model/user';
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
    this.authService.authUser(loginForm.value).subscribe(
      (response:UserForLogin) => {
        console.log(response);
        const user = response;
        localStorage.setItem('token', user.token);
        localStorage.setItem('token', user.userName);

        this.alertify.success('login successfully');
        this.route.navigate(['/'])

      }
        //, error => {
      //   console.log(error);
      //   this.alertify.error(error.error)
      // }

    );
    // const token = this.authService.authUser(loginForm.value);
    // if (token) {
    //   localStorage.setItem('token',token.userName)
    //   // console.log('ok');
    //   this.alertify.success('login successfully');
    //   this.route.navigate(['/'])
    // } else {
    //   // console.log('no')
    //   this.alertify.error('login not successfully');
    // }
  }
}

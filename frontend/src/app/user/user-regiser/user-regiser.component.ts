import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/User-service.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { User} from 'src/app/model/user'
@Component({
  selector: 'app-user-regiser',
  templateUrl: './user-regiser.component.html',
  styleUrls: ['./user-regiser.component.css']
})
export class UserRegiserComponent implements OnInit {

  registerationForm: FormGroup;
  user: User;
  userSubmitted: boolean;
  constructor(private fb: FormBuilder, private userService: UserServiceService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    // this.registerationForm = new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   Email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    //   confirmpassword: new FormControl(null, [Validators.required]),
    //   moblie: new FormControl(null, [Validators.required, Validators.maxLength(2)])
    // },
    //   this.passwordValidators

    // );
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerationForm = this.fb.group({
      userName: [null, Validators.required],
      Email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(2)]],
      confirmpassword: [null, Validators.required],
      moblie: [null, [Validators.required, Validators.maxLength(2)]]
    },
      { Validators: this.passwordValidators });
  }
  passwordValidators(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmpassword').value ? null :
      {
        notmatched: true
      };
  }
  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }
  get Email() {
    return this.registerationForm.get('Email') as FormControl;
  }
  get password() {
    return this.registerationForm.get('password') as FormControl;
  }
  get confirmpassword() {
    return this.registerationForm.get('confirmpassword') as FormControl;
  }
  get moblie() {
    return this.registerationForm.get('moblie') as FormControl;
  }
  onSubmit() {
    this.userSubmitted = true;
    console.log(this.registerationForm);
    if (this.registerationForm.valid) {
      // this.user = Object.assign(this.user, this.registerationForm.value);
      this.userService.addUser(this.userData());
      this.registerationForm.reset(); //note
      this.userSubmitted = false;
      this.alertify.success('login successfully ')
    } else {
        this.alertify.error('login Errors')
    }

  }
  userData(): User {
    return this.user = {
      userName: this.userName.value,
      Email: this.Email.value,
      password: this.password.value,
       moblie :this.moblie.value
    }
  }


}
  // addUser(user) {
  //   let users = [];
  //   if (localStorage.getItem('Users')) {
  //     users = JSON.parse(localStorage.getItem('Users'));
  //     users = [user, ...users];
  //   }
  //   else {
  //     users=[user]
  //   }
  //   localStorage.setItem('Users',JSON.stringify(users))
  // }

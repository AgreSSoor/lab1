import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../shared/services/user.service';
import { Component } from '@angular/core';
import { UserLogin } from '../shared/models/user/user-login';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  constructor(private router: Router, private userService: UserService) {}

  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  hidePassword = true;

  login(): void {
    if (this.form.valid) {
      let user: UserLogin = <UserLogin>{
        username: this.username.value,
        password: this.password.value,
      };

      this.userService.login(user).pipe(
        tap(() => {
          window.location.reload();
          this.router.navigate(['user/list'])
        })).subscribe();
    }
  }

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
}

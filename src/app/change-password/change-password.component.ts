import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePassword } from '../shared/models/user/change-password';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  constructor(private router: Router, private userService: UserService) {}

  form: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required]),
  });

  hidePassword = true;

  changePassword(): void {
    if (this.form.valid) {
      let changePassword: ChangePassword = <ChangePassword>{
        oldPassword: this.oldPassword.value,
        newPassword: this.newPassword.value
      };

      this.userService.update(changePassword).pipe(
        tap(() => {
          this.router.navigate(['user/list'])
        })).subscribe();
    }
  }

    getOldPasswordErrorMessage() {
    return this.oldPassword.hasError('required') ? 'You must enter a value' : '';
    }

    getNewPasswordErrorMessage() {
    return this.newPassword.hasError('required') ? 'You must enter a value' : '';
    }

  get oldPassword(): FormControl {
    return this.form.get('oldPassword') as FormControl;
  }

  get newPassword(): FormControl {
    return this.form.get('newPassword') as FormControl;
  }
}

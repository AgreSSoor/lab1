import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { UserDto } from '../shared/models/user/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = localStorage.getItem('access_token') ? true : false;
  user: UserDto;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('user_id') !== null &&
      localStorage.getItem('user_id') !== undefined
    ) {
      this.userService
        .getById(localStorage.getItem('user_id')!)
        .subscribe((data) => {
          this.user = data;
        });
    }
  }

  logOut(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');

    this.isLoggedIn = false;
    window.location.reload();
    this.router.navigate(['account/login']);
  }
}

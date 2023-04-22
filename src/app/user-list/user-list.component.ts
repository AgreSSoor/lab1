import { UserService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserDto } from '../shared/models/user/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserDto[];
  displayedColumns: string[] = [ "id", "username" ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAll();
  }



  getAll = () => {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    })
  }
}

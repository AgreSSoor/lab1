import { UserDto } from '../models/user/user';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/app/environments/environments";
import { ChangePassword } from 'src/app/shared/models/user/change-password';
import { UserResponse } from 'src/app/shared/models/user/user-response';
import { UserLogin } from '../models/user/user-login';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

  readonly baseUrl = environment.baseUrl + 'user'

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.baseUrl}/getAll`);
  }

  getById(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/getById?id=${id}`);
  }

  register(userDto: UserLogin): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/register`, userDto);
  }

  login(userDto: UserLogin): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, userDto).pipe(
      tap((result: any) => {
        localStorage.setItem('access_token', result.jwt);
        localStorage.setItem('user_id', result.userId)
      })
    );
  }

  update(updatePassword: ChangePassword): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.baseUrl}/changePassword`, updatePassword);
  }
}

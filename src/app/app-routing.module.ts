import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { NoteCreateComponent } from './note-create/note-create.component';

const routes: Routes = [
  { path: 'user/list', canActivate: [AuthenticationGuard], component: UserListComponent },
  { path: 'user/update', canActivate: [AuthenticationGuard], component: ChangePasswordComponent },
  { path: 'note/list',  canActivate: [AuthenticationGuard], component: NoteListComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'note/create', canActivate: [AuthenticationGuard], component: NoteCreateComponent },
  { path: 'note/list/:id',  canActivate: [AuthenticationGuard], component: NoteListComponent },
  { path: 'note/details/:id', canActivate: [AuthenticationGuard], component: NoteEditComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

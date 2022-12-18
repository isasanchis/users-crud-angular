import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component'
import { UserListComponent } from './user-list/user-list.component'
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  { path: 'listUser', component: UserDetailComponent },
  { path: 'userList', component: UserListComponent },
  { path: 'userEdit', component: UserEditComponent },
  { path: 'userEdit/:id', component: UserEditComponent },
  { path: '**', redirectTo: 'userList' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

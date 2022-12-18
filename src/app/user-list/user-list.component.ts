import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUsersDto } from 'src/interfaces/IUsersDto';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  selectedUser!: IUsersDto;
  users: IUsersDto[] = [];
  showScreen = "userList"

  constructor(private http: HttpClient, private router: Router) {
    this.getUsers();
  }

  getUsers() {
    this.users = [];
    this.http.get('http://localhost:3000/data')
    .pipe(
      map((response: any) => {
        return Object.values(response);
      })
    )
    .subscribe((data) => {
      for(let index = 0; index < data.length; index++) {
        let conteudoJson: any = data[index];
        this.users.push(conteudoJson as IUsersDto);
      }
    });
  }

  userDetail(id: number) {
    this.showScreen = 'userDetail';
    for(let i = 0; i < this.users.length; i++) {
      if(id == this.users[i].id) {
        this.selectedUser = this.users[i];
        break;
      }
    }
  }
  
  closeDetail = () => {
    this.showScreen = 'userList';
  }

  remove(id: number) {
    this.http.delete(`http://localhost:3000/data/${id}`)
    .subscribe(() => {
      this.getUsers();
    });
  }

  userEdit(id: number) {
    this.router.navigate([`userEdit/${id}`]);
  }

  userAdd(){
    this.router.navigate([`userEdit`]);
  }

}

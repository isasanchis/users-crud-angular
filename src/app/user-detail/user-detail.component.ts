import { IUsersDto } from '../../interfaces/IUsersDto'
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent {
  @Input() user!: IUsersDto;
  @Input() closeDetail!: () => void;

  constructor() { }

  // ngOnInit(): void {
  //   console.log(`selected object :${JSON.stringify(this.user)}`);
  // }

  close() {
    this.closeDetail();
  }

}
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IUsersDto } from '../../interfaces/IUsersDto';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  user!: IUsersDto;
  idRecebido!: number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.route.paramMap.subscribe(params => {
      this.idRecebido = Number(params.get('id'));
    });
  }

  ngOnInit(): void {
    this.user = {
      id: this.idRecebido ?? 0,
      first_name: '',
      avatar: '',
      email: ''
    }

    if (this.idRecebido) {
      this.http
        .get(`https://reqres.in/api/users/${this.idRecebido}`)
        .subscribe((data) => {
          this.user = data as IUsersDto;
        });
    }

  }

  save() {
    if (this.validateInfo()) {
      if (this.user.id == 0) {
        this.http.post('http://localhost:3000/data', this.user)
          .subscribe(() => {
            this.router.navigate(['userList']);
          });

      } else {
        this.http.patch(`http://localhost:3000/data/${this.idRecebido}`, this.user)
          .subscribe(() => {
            this.router.navigate(['userList']);
          });
      }
      this.toastr.success('Usuário criado com sucesso.', 'Sucesso!', {
        timeOut: 3000,
      });
    } else {
      this.toastr.warning('Preencha todos os campos!', 'Campo vazio', {
        timeOut: 3000,
      });
    }
    
  }

  validateInfo(): boolean {
    if (this.user.first_name == '' || this.user.avatar == '' || this.user.email == '') {
      return false;
    }
    return true;
  }

}
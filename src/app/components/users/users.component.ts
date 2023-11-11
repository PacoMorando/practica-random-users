import { Component } from '@angular/core';
import { RandomUsersService } from 'src/app/services/random-users.service';
import { User } from 'src/app/services/users-results';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  protected users: User[] = [];
  protected tableClass: string = 'table table-hover';

  constructor(private randomUserService: RandomUsersService) {
    // EJEMPLO DE COMO ESPERAR AL SERVICE PARA LEER TODO EL JSON
    // this.randomUserService.getUsersAsString().subscribe(data => {
    //     this.usersAsString = JSON.stringify(data);
    // });
    this.randomUserService.getUsers().subscribe(data => {
      console.log(data.results);
      this.users = data.results;
    });
  }

  protected switchTableClass() {
    if (this.tableClass == 'table table-hover') {
      this.tableClass = 'table table-hover table-striped';
    } else {
      this.tableClass = 'table table-hover';
    }
  }

  protected sortByCountry(){
    this.users.sort((a, b) => {
      if (a.location.country < b.location.country) return -1;
      if (a.location.country > b.location.country) return 1;
      return 0;
    });
  }

}

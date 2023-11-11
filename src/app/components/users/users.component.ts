import { Component } from '@angular/core';
import { RandomUsersService } from 'src/app/services/random-users.service';
import { User } from 'src/app/services/users-results';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  protected stringForTest: string = ''
  protected users: User[] = [];

  constructor(private randomUserService: RandomUsersService){
     // EJEMPLO DE COMO ESPERAR AL SERVICE PARA LEER TODO EL JSON
    // this.randomUserService.getUsersAsString().subscribe(data => {
    //     this.usersAsString = JSON.stringify(data);
    // });
    this.randomUserService.getUsers().subscribe(data => {
      console.log(data.results);
      this.users = data.results;
      this.stringForTest = this.users[0].email;
    });
  }

}

import { Component } from '@angular/core';
import { RandomUsersService } from './services/random-users.service';
import { User } from './services/users-results';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'random-users';
  protected stringForTest: string = ''
  protected users: User[] = [];

  constructor(private randomUserService: RandomUsersService) {
    // EJEMPLO DE COMO ESPERAR AL SERVICE PARA LEER TODO EL JSON
    // this.randomUserService.getUsersAsString().subscribe(data => {
    //     this.usersAsString = JSON.stringify(data);
    // });
    this.randomUserService.getUsers().subscribe(data => {
      console.log(data.results);
      this.users = data.results;
      this.stringForTest = this.users[0].email;
      console.log(this.users[0]);
      console.log(this.users[0].email);

    });
  }
}

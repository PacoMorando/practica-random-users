import { Component } from '@angular/core';
import { RandomUsersService } from 'src/app/services/random-users.service';
import { User } from 'src/app/services/users-results';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  private users: User[] = [];
  private usersRegist: User[] = [];
  protected isSorted = true;
  protected tableClass: string = 'table table-hover';
  protected sortButtonText: string = 'ordenar por pais';

  constructor(private randomUserService: RandomUsersService) {
    // EJEMPLO DE COMO ESPERAR AL SERVICE PARA LEER TODO EL JSON
    // this.randomUserService.getUsersAsString().subscribe(data => {
    //     this.usersAsString = JSON.stringify(data);
    // });
    this.randomUserService.getUsers().subscribe(data => {
      console.log(data.results);
      this.users = data.results;
      this.usersRegist = [...this.users]
    });

  }

  protected switchTableClass() {
    if (this.tableClass == 'table table-hover') {
      this.tableClass = 'table table-hover table-striped';
    } else {
      this.tableClass = 'table table-hover';
    }
  }

  private getUsers(): User[] {
    if (this.isSorted == false) {
      return [...this.users].sort((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      });
    } else {
      return [...this.users];
    }
  }

  protected getUsersTable(): User[] {
    return this.getUsers();
  }

  protected deleteUser(user: User) {
    // delete this.users[index];
    // this.users.slice(index, index);
    // this.users.splice(index, 1);
    this.users.splice(this.users.indexOf(user), 1);
    console.log(user.name.first +" "+ user.name.last);
  }

  protected setSortByCountry() {
    this.isSorted = !this.isSorted;
    if(!this.isSorted){
      this.sortButtonText ='no ordenar por pais'
    }else{
      this.sortButtonText ='ordenar por pais'
    }
  }

  protected resetUsersList(){
    this.users = [...this.usersRegist];
  }
}

import { Component } from '@angular/core';
import { RandomUsersService } from 'src/app/services/random-users.service';
import { User } from 'src/app/services/users-results';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  private usersReaded: User[] = [];
  private usersSorted: User[] = [];
  private usersDeleted: User[] = [];
  private users: User[] = [];
  protected isSorted = false;
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
      this.usersReaded = [...this.users];
      this.usersSorted = [...this.users];
    });

  }

  protected switchTableClass() {
    if (this.tableClass == 'table table-hover') {
      this.tableClass = 'table table-hover table-striped';
    } else {
      this.tableClass = 'table table-hover';
    }
  }

  private getSortedUsersBy(): User[] {
    console.log('ordenando por pais')
    this.usersSorted = [...this.usersReaded].sort((a, b) => {
      return a.location.country.localeCompare(b.location.country);
    });
    return this.usersSorted;
  }

  protected getUsersTable(): User[] {
    return this.users;
  }

  protected deleteUser(user: User) {
    // this.users.splice(index, 1);// borra desde el index hasta el index + el segundo parametro
    console.log(user.name.first + " " + user.name.last);
    this.users.splice(this.users.indexOf(user), 1);
    this.usersSorted.splice(this.usersSorted.indexOf(user), 1);
    console.log(this.users);
    console.log(this.usersSorted);
  }
  // protected deleteUser(user: User) {
  //   this.usersDeleted.push(user);
  // }

  protected setSortByCountry() {
    if (!this.isSorted) {
      this.sortButtonText = 'no ordenar por pais'
      this.users = this.getUsers();
    } else {
      this.sortButtonText = 'ordenar por pais'
      this.users = this.getUsers();
    }
    this.isSorted = !this.isSorted;
    console.log(this.users);
    console.log(this.usersSorted);
  }

  protected resetUsersList() {
    this.isSorted = false;
    this.users = [...this.usersReaded];
   // this.usersSorted = [...this.usersReaded];
  }

  protected filterByCountry(event: KeyboardEvent) {
    let filterInput: string = (event.target as HTMLInputElement).value.toLowerCase();
    this.users = this.getUsers().filter(user => user.location.country.toLowerCase().includes(filterInput));
  }

  private getUsers(): User[] {
    if (!this.isSorted) {
      return [...this.getSortedUsersBy()];
    } else {
      return [...this.usersReaded];
    }
  }

  private substractDeleted(): User[]{
    let users: User[] = [];
    return users;
  }

  // protected filterByCountryStartWhith(event: KeyboardEvent) {
  //   let filterInput: string = (event.target as HTMLInputElement).value.toLowerCase();
  //   this.users = [...this.usersReaded].filter(user => user.location.country.toLowerCase().startsWith(filterInput));
  // }

  // filterByCountry (event: any) {
  //   console.log(event.target.value)
  // }

}

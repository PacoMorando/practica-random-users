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
  private users: User[] = [];
  protected usersTable: User[] = [];
  protected isSorted = false;
  protected isSortedByCountry = false;
  protected isTableStriped = false;

  constructor(private randomUserService: RandomUsersService) {
    // EJEMPLO DE COMO ESPERAR AL SERVICE PARA LEER TODO EL JSON
    // this.randomUserService.getUsersAsString().subscribe(data => {
    //     this.usersAsString = JSON.stringify(data);
    // });
    this.randomUserService.getUsers().subscribe(data => {
      console.log(data.results);
      this.usersReaded = data.results;
      this.usersSorted = [...this.usersReaded];
      this.users = [...this.usersReaded];
      this.usersTable = [...this.users];
    });

  }

  protected switchTableClass() {
    this.isTableStriped = !this.isTableStriped;
  }

  protected deleteUser(user: User) {
    // this.users.splice(index, 1);// borra desde el index hasta el index + el segundo parametro
    console.log(user.name.first + " " + user.name.last);
    this.users.splice(this.users.indexOf(user), 1);
    this.usersSorted.splice(this.usersSorted.indexOf(user), 1);
    this.usersTable = this.getUsers();
    console.log(this.users);
    console.log(this.usersSorted);
  }

  protected sortUsersBy(arg: number) {
    if (arg == 1) {
      if (!this.isSortedByCountry) {
        this.sortUsersByCountry();
      } else { this.unsortUsers() }
    }
    if (arg == 2) {
      this.sortUsersByFirstName();
      this.isSorted = true;
    }
    if (arg == 3) {
      this.sortUsersByLastName();
      this.isSorted = true;
    }
  }

  private sortUsersByCountry() {
    this.isSortedByCountry = true;
    this.usersSorted.sort((a, b) => {
      return a.location.country.localeCompare(b.location.country);
    });
    this.usersTable = [...this.usersSorted];
  }

  private sortUsersByFirstName() {
    this.usersSorted.sort((a, b) => {
      return a.name.first.localeCompare(b.name.first);
    });
    this.usersTable = [...this.usersSorted];
    this.isSortedByCountry = false;
  }

  private sortUsersByLastName() {
    this.usersSorted.sort((a, b) => {
      return a.name.last.localeCompare(b.name.last);
    });
    this.usersTable = [...this.usersSorted];
    this.isSortedByCountry = false;
  }

  private unsortUsers() {
    this.isSorted = false;
    this.isSortedByCountry = false;
    this.usersTable = [...this.users];
  }

  protected resetUsersList() {
    this.isSorted = false;
    this.users = [...this.usersReaded];
    this.usersTable = [...this.users];
  }

  protected filterByCountry(event: KeyboardEvent) {
    let filterInput: string = (event.target as HTMLInputElement).value.toLowerCase();
    // this.usersTable = this.getUsers().filter(user => user.location.country.toLowerCase().includes(filterInput));
    this.usersTable = this.getUsers().filter(user => user.location.country.toLowerCase().includes(filterInput));
  }

  private getUsers(): User[] {
    if (this.isSorted) {
      return [...this.usersSorted];
    } else {
      return [...this.users];
    }
  }

  // protected filterByCountryStartWhith(event: KeyboardEvent) {
  //   let filterInput: string = (event.target as HTMLInputElement).value.toLowerCase();
  //   this.users = [...this.usersReaded].filter(user => user.location.country.toLowerCase().startsWith(filterInput));
  // }

  // filterByCountry (event: any) {
  //   console.log(event.target.value)
  // }

}

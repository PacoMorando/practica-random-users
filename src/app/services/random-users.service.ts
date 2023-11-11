import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersResponse } from './users-results';

@Injectable({
  providedIn: 'root'
})
export class RandomUsersService {
  private apiURL = 'https://randomuser.me/api/?results=100'

  constructor(private httpClient: HttpClient) {
  }

  public getUsers(): Observable<UsersResponse>{
    return this.httpClient.get<UsersResponse>(this.apiURL).pipe(); 
  }

  //EJEMPPLO DE COPMO RECUPERAR TODO EL JSON
  // getUsersAsString(): Observable<any> {
  //   return this.httpClient.get<any>(this.apiURL).pipe(); 
  // }
}
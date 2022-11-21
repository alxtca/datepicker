import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dataStore!: {
    users: User[]
  }
  private _users!: BehaviorSubject<User[]>;

  constructor(private http: HttpClient) {
    this.dataStore = { users: []}
    this._users = new BehaviorSubject<User[]>([])
  }

  get users(): Observable<User[]> {
    return this._users.asObservable()
  }

  userById(id: number):User {
    return this.dataStore.users.find(x => x.id == id) as User
  }

  loadAll() {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users'

    return this.http.get<User[]>(usersUrl).subscribe(data => {
      this.dataStore.users = data;
      this._users.next(Object.assign({}, this.dataStore).users)
    }, error => {
      console.log("Failed to fetch users")
    })
  }

}

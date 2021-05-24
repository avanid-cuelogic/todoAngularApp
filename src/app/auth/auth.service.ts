// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '../../environments/environment';
import { TaskTodo } from '../todo/todo.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  apiKey = environment.firebaseApikey;
  constructor(private router: Router) {}

  signUp(
    email: string,
    fname: string,
    lname: string,
    password: string,
    gender: string,
    address: string,
    profileImage: string
  ) {
    let user;
    user = new User(
      email,
      fname,
      lname,
      password,
      gender,
      address,
      profileImage, []
    );
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
    this.router.navigate(['/auth']);
  }
  signIn(email: string, password: string, todoList: TaskTodo[]) {
    let registeredUser = JSON.parse(localStorage.getItem('userData') || '{}');
    let authenticate = false;
    if (
      email === registeredUser.email &&
      password === registeredUser.password
    ) {
      authenticate = true;
      registeredUser.todoList = todoList
      this.user.next(registeredUser);
    } else {
      console.log(
        'Invalid Credential, Use the correct credential or registerUrself'
      );
    }
    return authenticate;
  }

  updateUser(email: string,
    fname: string,
    lname: string,
    password: string,
    gender: string,
    address: string,
    profileImage: string){
      let user;
    user = new User(
      email,
      fname,
      lname,
      password,
      gender,
      address,
      profileImage,[]
    );
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);


  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);

  }

}

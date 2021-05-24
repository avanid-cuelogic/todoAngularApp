import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskTodo } from '../todo/todo.model';
import { TodoService } from '../todo/todo.service';
import { AuthService } from './auth.service';
// import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  isLoading = false;
  errorMessage = '';
  todoList = [];
  tasks: any;
  constructor(private router: Router, private authService: AuthService, private todoTaskService: TodoService) {}

  ngOnInit(): void {}

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(formValue: NgForm) {
    if (!formValue.valid) {
      return;
    }
    if (this.isLoginMode) {
      this.tasks = this.todoTaskService.getTasks();
        this.tasks.filter((todo:TaskTodo) => {
          if (todo.taskCreatedBy === formValue.value.email) {
            this.todoList.push(todo as never);
          }
        });
      let response = this.authService.signIn(formValue.value.email, formValue.value.password,this.todoList);
      if(response) {
        this.router.navigate(['/profile']);
      }
      else{
        this.errorMessage = 'Invalid Credential, Use the correct credential or registerUrself';
      }
    } else {
      this.authService.signUp(
        formValue.value.email,
        formValue.value.fname,
        formValue.value.lname,
        formValue.value.password,
        formValue.value.gender,
        formValue.value.address,
        formValue.value.profileImage
      );
      this.isLoginMode = true;
      this.errorMessage = '';
    }
  }
  onCloseAlert(){
    this.errorMessage = '';
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  NgForm,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { TaskTodo } from '../todo/todo.model';
import { TodoService } from '../todo/todo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: User;
  tasks: any;
  editMode = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private todoTaskService: TodoService
  ) {
    this.userData = {
      email: '',
      fname: '',
      lname: '',
      password: '',
      gender: '',
      address: '',
      profileImage: '',
      todoList: [],
    };
  }

  ngOnInit(): void {
    this.authService.user.subscribe((userData) => {
      if (userData) {
        this.userData = userData;
      }
    });
    console.log('userData', this.userData);
  }

  onEdit() {
    this.editMode = true;
  }
  onEditCancel() {
    this.editMode = false;
  }
  onSave(formValue: NgForm) {
    this.isLoading = true;
    this.authService.updateUser(
      this.userData.email,
      formValue.value.fname,
      formValue.value.lname,
      this.userData.password,
      formValue.value.gender,
      formValue.value.address,
      formValue.value.profileImage
    );
    this.editMode = false;
    this.isLoading = false;
  }
}

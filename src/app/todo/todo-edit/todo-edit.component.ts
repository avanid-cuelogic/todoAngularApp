import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TaskTodo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  id: any;
  editMode = false;
  todoForm: any;
  userName ='';

  constructor(private route: ActivatedRoute, private taskTodoService: TodoService,
              private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
      this.authService.user.subscribe(data =>{
        if(data) this.userName = data.email;
      })
  }

  onSave() {
    let temp = this.taskTodoService.getTask(this.id);
    let task = new TaskTodo(
      this.editMode && temp ? temp.taskId :'_' + Math.random().toString(36).substr(2, 9),
      this.todoForm.value.taskName,
      this.todoForm.value.category,
      this.todoForm.value.isPublic,
      this.todoForm.value.status,
      this.todoForm.value.date,
      this.todoForm.value.needReminder,
      this.todoForm.value.needReminder ? this.todoForm.value.reminderDate : "",
      this.todoForm.value.taskImage,
      this.userName
    )
    if (this.editMode) {
      this.taskTodoService.updateTask(this.id, task);
    } else {
      this.taskTodoService.addTask(task);
    }
    this.onCancel();
  }


  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let taskName ='';
    let category ='';
    let isPublic = false;
    let status ='';
    let date ='';
    let needReminder = false;
    let reminderDate = '';
    let taskImage = '';
    let taskCreatedBy = '';

    if (this.editMode) {
      const task = this.taskTodoService.getTask(this.id);
      if(task){taskName = task.taskName;
      category = task.category;
      isPublic = task.isPublic;
      status = task.status;
      date = task.date;
      needReminder = task.needReminder;
      reminderDate = task.reminderDate;
      taskImage = task.taskImage;
      taskCreatedBy = this.userName
      }
    }

    this.todoForm = new FormGroup({
      'taskName': new FormControl(taskName, Validators.required),
      'category' : new FormControl(category, Validators.required),
      'isPublic': new FormControl(isPublic),
      'status': new FormControl(status, Validators.required),
      'date' : new FormControl(date, Validators.required),
      'needReminder' : new FormControl(needReminder),
      'reminderDate': new FormControl(reminderDate),
      'taskImage' : new FormControl(taskImage),
    });
  }
}

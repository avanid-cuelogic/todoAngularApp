import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TaskTodo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  tasks: TaskTodo[] = [];
  tasksToDelete: string[];
  errorMessage='';
  checked = false;
  filterDate = '';
  filterStatus = '';
  filterCategory = '';
  userName = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todotaskService: TodoService,
    private authService: AuthService
  ) {
    this.tasksToDelete = [];
  }

  ngOnInit(): void {
    this.authService.user.subscribe((data) => {
      if (data) this.userName = data.email;
    });
    this.tasks = this.todotaskService.getTasks();
    this.todotaskService.taskChanged.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  newTodoTask() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  deleteSelectedTasks() {
    this.todotaskService.deleteTasks(this.tasksToDelete);
  }

  selectedTask(event: { taskName: string; createdBy:string, checked: boolean }) {
    this.errorMessage= '';
    this.checked = event.checked;
    if (event.createdBy == this.userName) {
      let index = this.tasksToDelete.indexOf(event.taskName);
      if (event.checked) {
        this.tasksToDelete.push(event.taskName);
      } else {
        if (index > -1) {
          this.tasksToDelete.splice(index, 1);
        }
      }
    } else{
      this.errorMessage = 'Not Authorized to delete this task! Please uncheck this task!';
    }
  }

  onCloseAlert(){
    this.errorMessage ='';
  }
}

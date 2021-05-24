import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TaskTodo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit {
  task: any = TaskTodo;
  id: any;
  userName = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _el: ElementRef,
    private todoTaskService: TodoService, private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log('id',this.id)
      this.task = this.todoTaskService.getTask(this.id);
      console.log(this.task)
    });
    this.authService.user.subscribe((user) => {
      if(user) this.userName = user.email;
    })
  }
  editTask() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  deleteTask() {
    this.todoTaskService.deleteTask(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toogleOpen() {
    this.isOpen = !this.isOpen;
    this._el.nativeElement
      .querySelector('.dropdown-menu')
      .classList.toggle('show');
  }
}

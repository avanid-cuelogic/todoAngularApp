import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { TaskTodo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  taskSelected:string[];
  user: any;
  tasks = [
    new TaskTodo('_aa001','todo-1','cooking',true, 'completed','2021-05-23',false,'',
    'https://picsum.photos/200','dev-bsh@bsh.com'),
    new TaskTodo('_aa002','todo-2','shopping',false, 'hold','2021-05-27',true,'',
    'https://picsum.photos/200','a@gmail.com'),
  ];
  taskChanged = new Subject<TaskTodo[]>();

  constructor(private authService: AuthService) {
    this.taskSelected = [];
    this.authService.user.subscribe(user =>{
      if(user)this.user = user;
    })
   }

  getTasks() {
    return this.tasks.slice();
  }
  getTask(id: any){
    return this.tasks.find(element => element.taskId === id);
  }
  addTask(task: TaskTodo){
    this.tasks.push(task);
    this.taskChanged.next(this.tasks.slice())
    if(this.user.email == task.taskCreatedBy) {
      this.user.todoList.push(task);
    }

  }
  updateTask(id:any,newtask: TaskTodo){
    let update = 0;
    this.tasks.map((element, index) => {
      if(element.taskId == id){
       update = index;
      }
    })
    this.tasks[update] = newtask;
    this.taskChanged.next(this.tasks.slice())
    // let index=0;
    if(this.user.email == newtask.taskCreatedBy) {
      this.user.todoList.map((task: TaskTodo, index: number) =>{
        if(task.taskId === id) {
          this.user.todoList[index] = newtask;
        }
      })
    }

  }
  deleteTask(id:any){
    let update = 0;
    this.tasks.map((element, index) => {
      if(element.taskId == id){
       update = index;
      }
    })
    this.tasks.splice(update,1)
    this.taskChanged.next(this.tasks.slice())
    this.user.todoList.map((task: TaskTodo, index: number) =>{
        if(task.taskId === id) {
          console.log('delete single', task.taskId, id)
          this.user.todoList.splice(index,1)
        }
    })
    console.log('after deletesinglr', this.user)
  }

  deleteTasks(tasksForDelete: string[]) {
    this.tasks = this.tasks.filter((todo) => {
      return !tasksForDelete.includes(todo.taskName)
    })
    this.taskChanged.next(this.tasks.slice());
    this.user.todoList = this.user.todoList.filter((todo: any)=>{
      console.log('todo', todo)
      return !tasksForDelete.includes(todo.taskName)
    })
  }


}

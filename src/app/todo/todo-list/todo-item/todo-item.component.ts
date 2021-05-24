import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskTodo } from '../../todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() task: any = TaskTodo;
  @Input() index: any;
  @Output() selectedTask = new EventEmitter();
  deleteSelectedTasks = false;
  constructor() {}

  ngOnInit(): void {}

  onSelected(task:TaskTodo){
    this.selectedTask.emit({taskName:task.taskName, createdBy: task.taskCreatedBy,checked:this.deleteSelectedTasks});
  }
}

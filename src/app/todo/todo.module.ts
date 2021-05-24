import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/auth.guard.service';
import { SharedModule } from '../shared/shared.module';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoStartComponent } from './todo-start/todo-start.component';
import { TodoComponent } from './todo.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';

@NgModule({
  declarations: [
    TodoComponent,
    TodoStartComponent,
    TodoEditComponent,
    TodoDetailComponent,
    TodoListComponent,
    TodoItemComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TodoComponent,
        canActivate: [AuthGuardService],
        children: [
          { path: '', component: TodoStartComponent },
          { path: 'new', component: TodoEditComponent },
          { path: ':id', component: TodoDetailComponent },
          { path: ':id/edit', component: TodoEditComponent },
        ],
      },
    ]),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [],
})
export class TodoModule {}

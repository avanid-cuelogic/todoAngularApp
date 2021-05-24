import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo: 'todo', pathMatch: 'full'},
  {path:'auth', loadChildren:()=> import('./auth/auth.module').then(m=> m.AuthModule)},
  {path:'profile', loadChildren:()=> import('./profile/profile.module').then(m=> m.ProfileModule)},
  {path:'todo', loadChildren:()=> import('./todo/todo.module').then(m=> m.TodoModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

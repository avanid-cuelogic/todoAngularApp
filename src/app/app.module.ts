import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
// import { TodoComponent } from './todo/todo.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './profile/profile.module';
import { TodoModule } from './todo/todo.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    ProfileModule,
    TodoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

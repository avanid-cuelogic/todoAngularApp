import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() optionSelected = new EventEmitter();
  
  isAuthenticated =false;
  private userSubscription: any;
  constructor(private authService: AuthService){}
    // private dataStorage: DataStorageService, private authService: AuthService) { }
  collapsed = true;
  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(data =>{
      this.isAuthenticated = !!data;
    });
  }
 
  logout(){
    this.authService.logout();
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}

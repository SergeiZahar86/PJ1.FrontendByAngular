import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  _user: any;
  loadedUserSub: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadedUserSub = this.authService.userLoadedEvent
        .subscribe(user => {
          this._user = user;
        });

  }
  clearState() {
    this.authService.clearState();
  }
  getUser() {
    this.authService.getUser();
  }
  removeUser() {
    this.authService.removeUser();
  }
  startSigninMainWindow() {
    this.authService.startSigninMainWindow();
  }
  endSigninMainWindow() {
    this.authService.endSigninMainWindow();
  }
  
  /** Sign Out */
  startSignoutMainWindow() {
    this.authService.startSignoutMainWindow();
  }
  
  /** Sign In */
  endSignoutMainWindow() {
    this.authService.endSigninMainWindow();
  }

  ngOnDestroy(){
    if(this.loadedUserSub.unsubscribe()){
      this.loadedUserSub.unsubscribe();
    }
  }


}

import {AfterContentInit, Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit{
  title = 'app';
  
  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    
  }
  
  
}

import {AfterContentInit, Component, NgIterable, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {User} from "oidc-client";
import {ApiService} from "./services/api.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit {
	title = 'app';

	curentUserString: User | null | undefined;

	users:any;
	constructor(private authService: AuthService, 
		private apiService: ApiService) {

	}

	ngOnInit(): void {
	}

	async ngAfterContentInit(): Promise<void> {
		await this.authService.getUser();
		this.curentUserString = this.authService.currentUser;
		console.log("currentUser ", this.curentUserString);
		this.apiService.getAll().subscribe( users => {
			console.log("getAll ", users);
		})
		
	}


	clickSignInEvent() {
		//this.authService.userManager.signinRedirect();
		this.authService.startSigninMainWindow();
	}

	async getCurentUser() {
		await this.authService.getUser();
		this.curentUserString = this.authService.currentUser;
		console.log("currentUser ", this.curentUserString);
	}
}

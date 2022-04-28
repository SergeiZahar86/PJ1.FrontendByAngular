import {AfterContentInit, Component, NgIterable, OnInit} from '@angular/core';
//import {AuthService} from "./services/auth.service";
//import {User} from "oidc-client";
import {ApiService} from "./services/api.service";
import {OAuthService} from "angular-oauth2-oidc";
import {AuthOidcService} from "./services/auth-oidc.service";
import {authCodeFlowConfig} from "./authCodeFlowConfig";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit {
	title = 'app';

	//curentUserString: User | null | undefined;

	users: any;

	constructor(private apiService: ApiService, private authOidcService: AuthOidcService,
		private oAuthService: OAuthService) {

	}

	ngOnInit(): void {
	}

	async ngAfterContentInit(): Promise<void> {
//		await this.authService.getUser();
//		this.curentUserString = this.authService.currentUser;
//		console.log("currentUser ", this.curentUserString);
//		this.apiService.getAll().subscribe( users => {
//			console.log("getAll ", users);
//		})
//		this.oAuthService.configure(authCodeFlowConfig);
//		await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
	}


	async clickSignInEvent() {
		//this.authService.userManager.signinRedirect();
		//this.authService.startSigninMainWindow();
		

	}

	async getCurentUser() {
//		await this.authService.getUser();
//		this.curentUserString = this.authService.currentUser;
//		console.log("currentUser ", this.curentUserString);
	}
}

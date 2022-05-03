import {AfterContentInit, Component, NgIterable, OnInit} from '@angular/core';
import {AuthOidcService} from "./Authentication/Services/auth-oidc.service";
import {AuthService} from "./core/auth/auth.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit {
	title = 'app';

	constructor(private authOidcService: AuthOidcService,
		private authService: AuthService) {
	}

	async ngOnInit(): Promise<void> {
		//await this.authOidcService.loadConfigure();
		this.authService.initAuth();
		this.authService.checkAuth();
	}

	async ngAfterContentInit(): Promise<void> {
	}

}

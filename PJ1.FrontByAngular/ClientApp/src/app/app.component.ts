import {AfterContentInit, Component, OnInit} from '@angular/core';
import {AuthOidcService} from "./Authentication/Services/auth-oidc.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit {
	title = 'app';
	
	//todo убрать мусор от старой библиотеки аутентификации
	constructor(private authOidcService: AuthOidcService) {
	}

	async ngOnInit(): Promise<void> {
		await this.authOidcService.loadConfigure();
	}

	async ngAfterContentInit(): Promise<void> {
	}

}

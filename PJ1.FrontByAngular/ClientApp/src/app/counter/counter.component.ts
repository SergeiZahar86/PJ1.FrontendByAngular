import {AfterContentInit, Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";
import {authCodeFlowConfig} from "../Authentication/authCodeFlowConfig";
import {AuthOidcService} from "../Authentication/Services/auth-oidc.service";

@Component({
	selector: 'app-counter-component',
	templateUrl: './counter.component.html',
	styleUrls: ['./counter.scss']
})
export class CounterComponent implements OnInit, AfterContentInit {

	public currentCount = 0;

	public claims: any;

	constructor(private oAuthService: OAuthService,
		private router: Router,
		private authOidcService: AuthOidcService) {
	}

	async ngAfterContentInit(): Promise<void> {
	}

	/**
	 * Увеличивает счетчик
	 */
	public incrementCounter() {
		this.currentCount++;
	}

	/**
	 * Пройти аутентификацию 
	 */
	clickSignIn() {
		this.authOidcService.signIn();
	}

	/**
	 * Разлогиниться
	 */
	clickSignOut() {
		this.authOidcService.signOut();
	}

	get token() {
		this.claims = this.authOidcService.getClaims();
		return this.claims ? this.claims : null;
	}

	ngOnInit(): void {
	}

	/**
	 * Получить требования о пользователе
	 */
	getClaims() {
		if (this.claims) {
			console.log("login claims ",this.claims);
		}
	}
}

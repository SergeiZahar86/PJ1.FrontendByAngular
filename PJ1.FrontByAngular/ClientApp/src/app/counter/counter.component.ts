import {AfterContentInit, Component, OnInit} from '@angular/core';
import {AuthOidcService} from "../services/auth-oidc.service";
import {OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../authCodeFlowConfig";
import {Router} from "@angular/router";

@Component({
	selector: 'app-counter-component',
	templateUrl: './counter.component.html',
	styleUrls: ['./counter.scss']
})
export class CounterComponent implements OnInit, AfterContentInit {

	public currentCount = 0;

	public claims: any;

	constructor(private authOidcService: AuthOidcService,
		private oAuthService: OAuthService, private router: Router) {
	}

	async ngAfterContentInit(): Promise<void> {
		this.oAuthService.configure(authCodeFlowConfig);
		await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
	}


	public incrementCounter() {
		this.currentCount++;
	}

	clickSignIn() {
		console.log("login ",);
		this.oAuthService.setupAutomaticSilentRefresh();
		this.oAuthService.initCodeFlow();
	}

	clickSignOut() {
		console.log("logout ",);
		this.oAuthService.logOut();
	}

	get token() {
		this.claims = this.oAuthService.getIdentityClaims();
		return this.claims ? this.claims : null;
	}

	ngOnInit(): void {
	}

	getClaims() {
		if (this.claims) {
			console.log("login claims ",this.claims);
		}
	}
}

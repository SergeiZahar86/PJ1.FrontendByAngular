import {Inject, Injectable} from '@angular/core';
import {OidcSecurityService, OpenIdConfiguration} from "angular-auth-oidc-client";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class ConfigService {

	getConfig(): OpenIdConfiguration {
		return {
			authority: this.authUrl,
			redirectUrl: this.originUrl + '/counter',
			clientId: 'client_angular',
			responseType: 'code',
			scope: 'openid profile SwaggerAPI',
			postLogoutRedirectUri: this.originUrl,
			forbiddenRoute: '/forbidden',
			unauthorizedRoute: '/unauthorized',
			silentRenew: true,
			silentRenewUrl: this.originUrl + '/silent-renew.html',
			historyCleanupOff: true,
			autoUserInfo: true,
			logLevel: 1,
			maxIdTokenIatOffsetAllowedInSeconds: 10
		};
	}
	

	constructor(private oidcSecurityService: OidcSecurityService,
		private http: HttpClient,
		private router: Router,
		@Inject('BASE_URL') private originUrl: string,
		@Inject('AUTH_URL') private authUrl: string,) {
	}
}

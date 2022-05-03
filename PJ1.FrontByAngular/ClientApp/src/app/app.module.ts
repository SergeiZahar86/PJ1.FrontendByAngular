import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {HomeComponent} from './home/home.component';
import {CounterComponent} from './counter/counter.component';
import {FetchDataComponent} from './fetch-data/fetch-data.component';
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OAuthModule} from "angular-oauth2-oidc";
import {AuthOidcService} from "./Authentication/Services/auth-oidc.service";
import {CoreModule} from "./core/core.module";
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {
	AuthModule, OidcSecurityService, StsConfigLoader, StsConfigStaticLoader
} from "angular-auth-oidc-client";
import {ConfigService} from "./core/auth/config.service";
import {AuthService} from "./core/auth/auth.service";


/**
 * Создание фабрики конфигурации
 * @param {ConfigService} configService
 * @returns {StsConfigStaticLoader}
 */
const authFactory = (configService: ConfigService) => {
	const config = configService.getConfig();
	return new StsConfigStaticLoader(config);
};


@NgModule({
	declarations: [
		AppComponent,
		NavMenuComponent,
		HomeComponent,
		CounterComponent,
		FetchDataComponent,
		UnauthorizedComponent
	],
	imports: [
		BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot([
			{path: '', component: HomeComponent, pathMatch: 'full'},
			{path: 'counter', component: CounterComponent},
			{path: 'fetch-data', component: FetchDataComponent},
			{path: 'unauthorized', component: UnauthorizedComponent},
			{path: 'forbidden', component: UnauthorizedComponent},
			{path: '**', redirectTo: ''}
		]),
		MatButtonModule,
		MatButtonModule,
		BrowserAnimationsModule,
		//CoreModule,
		AuthModule.forRoot({
			config:{
				authority: 'https://localhost:10001',
				redirectUrl: 'https://localhost:10003' + '/counter',
				clientId: 'client_angular',
				responseType: 'code',
				scope: 'openid profile SwaggerAPI',
				postLogoutRedirectUri: 'https://localhost:10003',
				forbiddenRoute: '/forbidden',
				unauthorizedRoute: '/unauthorized',
				silentRenew: true,
				silentRenewUrl: 'https://localhost:10003' + '/silent-renew.html',
				historyCleanupOff: true,
				autoUserInfo: true,
				logLevel: 3,
				maxIdTokenIatOffsetAllowedInSeconds: 10
			}
		}),
		OAuthModule.forRoot(
//			{
//				resourceServer: {
//					allowedUrls: ['https://localhost:7001'],
//					sendAccessToken: true
//				}
//			}
		)
	],
	providers: [
		AuthOidcService,
		AuthService,
		OidcSecurityService,
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

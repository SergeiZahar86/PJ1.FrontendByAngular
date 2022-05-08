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
import {AuthOidcService} from "./Authentication/Services/auth-oidc.service";
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {OAuthModule, OAuthStorage} from "angular-oauth2-oidc";
import {AuthGuard} from "./Authentication/auth.guard";

/**
 * Нам нужна фабрика, так как LocalStorage не доступна во время построения AOT.
 * @returns {OAuthStorage}
 */
export function storageFactory(): OAuthStorage {
	return localStorage
}

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
			{
				path: '',
				component: HomeComponent,
				pathMatch: 'full'
			},
			{
				path: 'counter',
				component: CounterComponent,
				canActivate: [AuthGuard],
			},
			{
				path: 'fetch-data',
				component: FetchDataComponent
			},
			{
				path: 'unauthorized',
				component: UnauthorizedComponent
			},
			{
				path: 'forbidden',
				component: UnauthorizedComponent
			},
			{
				path: '**',
				redirectTo: ''
			}
		]),
		MatButtonModule,
		MatButtonModule,
		BrowserAnimationsModule,
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
		AuthGuard,
		{
			provide: OAuthStorage,
			useFactory: storageFactory
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

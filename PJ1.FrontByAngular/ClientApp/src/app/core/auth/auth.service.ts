import {Injectable, OnDestroy, Inject} from '@angular/core';
import {
	OidcSecurityService, OpenIdConfiguration, AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class AuthService {

	isAuthorized = false;

	constructor(
		private oidcSecurityService: OidcSecurityService,
		private http: HttpClient,
		private router: Router
	) {
	}

/*
	private isAuthorizedSubscription: Subscription = new Subscription;

	ngOnDestroy(): void {
		if (this.isAuthorizedSubscription) {
			this.isAuthorizedSubscription.unsubscribe();
		}
	}
*/

	public initAuth() {
	}

	/**
	 * Этот метод checkAuth() необходим для обработки перенаправления из службы токенов
	 * безопасности и установки правильных состояний. Этот метод необходимо
	 * использовать для обеспечения правильного функционирования библиотеки.
	 */
	public checkAuth() {
		this.oidcSecurityService.checkAuth()
		.subscribe(({isAuthenticated, userData, accessToken, idToken}) => {
			console.log("isAuthenticated ", isAuthenticated);
			console.log("userData ", userData);
			console.log("accessToken ", accessToken);
			console.log("idToken ", idToken);
		});
	}

/*
	private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {

		console.log('Auth result received AuthorizationState:'
			+ authorizationResult.authorizationState
			+ ' validationResult:' + authorizationResult.validationResult);

		if (authorizationResult.authorizationState === AuthorizationState.unauthorized) {
			if (window.parent) {
				// sent from the child iframe, for example the silent renew
				this.router.navigate(['/unauthorized']);
			} else {
				window.location.href = '/unauthorized';
			}
		}
	}

	private doCallbackLogicIfRequired() {

		this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
	}

	getIsAuthorized(): Observable<boolean> {
		return this.oidcSecurityService.getIsAuthorized();
	}
*/

	/**
	 * Залогиниться
	 */
	login() {
		console.log('start login');
		this.oidcSecurityService.authorize();
	}

	/**
	 * Разлогиниться
	 */
	logout() {
		console.log('start logoff');
		this.oidcSecurityService.logoff();
	}

	/**
	 * Получить состояние
	 * @returns {Promise<string>}
	 */
	async getState() {
		return await this.oidcSecurityService.getState().toPromise();
	}

	/**
	 * Получить данные о пользователе
	 * @returns {Promise<any>}
	 */
	getUserData() {
		console.log("userData$ ",this.oidcSecurityService.userData$); 
	}

	async get(url: string): Promise<Observable<any>> {
		return this.http.get(url, {headers: await this.getHeaders()})
		.pipe(catchError((error: any) => {
			console.log("error ", error);
			return throwError(error);
		}));
	}

/*
	put(url: string, data: any): Observable<any> {
		const body = JSON.stringify(data);
		return this.http.put(url, body, {headers: this.getHeaders()})
		.pipe(catchError((error) => {
			this.oidcSecurityService.handleError(error);
			return throwError(error);
		}));
	}

	delete(url: string): Observable<any> {
		return this.http.delete(url, {headers: this.getHeaders()})
		.pipe(catchError((error) => {
			this.oidcSecurityService.handleError(error);
			return throwError(error);
		}));
	}

	post(url: string, data: any): Observable<any> {
		const body = JSON.stringify(data);
		return this.http.post(url, body, {headers: this.getHeaders()})
		.pipe(catchError((error) => {
			this.oidcSecurityService.handleError(error);
			return throwError(error);
		}));
	}
*/

	/**
	 * Возвращает заголовки
	 * @returns {Promise<HttpHeaders>}
	 * @private
	 */
	private async getHeaders() {
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/json');
		return await this.appendAuthHeader(headers);
	}

	/**
	 * Возвращает AccessToken
	 * @returns {Observable<string>}
	 */
	public getToken() {
		const token = this.oidcSecurityService.getAccessToken();
		return token;
	}

	/**
	 * Добавляет AuthHeader
	 * @param {HttpHeaders} headers
	 * @returns {Promise<HttpHeaders>}
	 * @private
	 */
	private async appendAuthHeader(headers: HttpHeaders) {
		const token = await this.oidcSecurityService.getAccessToken().toPromise();
		if (token === '') 
		{
			return headers; 
		}
		const tokenValue = 'Bearer ' + token;
		return headers.set('Authorization', tokenValue);
	}
}

import {Component, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthOidcService} from "../Authentication/Services/auth-oidc.service";
import {ApiService} from "../services/api.service";

@Component({
	selector: 'app-fetch-data',
	templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
	public forecasts: WeatherForecast[] = [];
	claims: any;

	constructor(
		private apiService: ApiService,
		http: HttpClient,
		@Inject('BASE_URL') baseUrl: string,
		private authOidcService: AuthOidcService) {
		http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
			this.forecasts = result;
		}, error => console.error(error));
	}

	/**
	 * Залогиниться
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

	/**
	 * Получить данные о пользователе
	 */
	getUserData() {

	}

	getAccessToken(){
		let accessToken = this.authOidcService.getAccessToken();
		console.log("accessToken ",accessToken);
	}

	/**
	 * Загружает профиль пользователя
	 */
	async loadUserProfile() {
		let userProfile = await this.authOidcService.loadUserProfile();
		console.log("userProfile", userProfile);
	}

	/**
	 * Возвращает полученные требования о пользователе.
	 */
	getClaims() {
		let claims = this.authOidcService.getClaims();
		console.log("claims ",claims);
	}

	/**
	 * Вызов API
	 */
	getAll() {
		this.apiService.getAll().subscribe(
			users => {
				console.log("users ",users);
			})
	}

	/**
	 * проверка валидности токена
	 */
	hasValidAccessToken(){
		let valid = this.authOidcService.hasValidAccessToken();
		console.log("valid token ", valid);
	}

	/**
	 * Обновление токена
	 * @returns {Promise<void>}
	 */
	silentRefresh() {
		this.authOidcService.silentRefresh();
	}
}

interface WeatherForecast {
	date: string;
	temperatureC: number;
	temperatureF: number;
	summary: string;
}

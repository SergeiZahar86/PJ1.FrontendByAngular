import {Injectable} from '@angular/core';
import {
	AuthConfig, JwksValidationHandler, OAuthErrorEvent, OAuthService
} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../authCodeFlowConfig";
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class AuthOidcService {
	private username: any;

	constructor(private oAuthService: OAuthService, private httpClient: HttpClient) {
	}

	/** Загрузите документ Discovery и попробуйте войти в систему */
	public async loadConfigure(): Promise<void> {
		this.oAuthService.configure(authCodeFlowConfig);
		this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
		this.oAuthService.setupAutomaticSilentRefresh();
		this.oAuthService.loadDiscoveryDocumentAndLogin();
		
		// For debugging:
		this.oAuthService.events.subscribe(
			e => e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e));

	}

	/** Создаст тихое обновление токена, когда срок действия токена истекает. Когда пользователь
	 *  зарегистрирован по этому методу.
	 *  Запускает поток кода авторизации и перенаправляет пользователю
	 *  на URL -адрес входа серверов Auth.
	 */
	public signIn(): void {
		console.log("login ",);
		this.oAuthService.initCodeFlow();

	}

	/**
	 * Получение Access Token
	 * @returns {string}
	 */
	public getAccessToken() {
		return this.oAuthService.getAccessToken();
	}

	/**
	 * Получение IdToken
	 * @returns {string}
	 */
	public getIdToken() {
		return this.oAuthService.getIdToken();
	}

	/**
	 * Загружает профиль пользователя
	 * @returns {Promise<object>}
	 */
	async loadUserProfile() {
		return await this.oAuthService.loadUserProfile();
	}

	/**
	 * Удаляет все токены и выпускает пользователя. Если настраивается
	 * URL -адрес входа, пользователь перенаправлен на него с
	 * помощью дополнительного параметра состояния
	 */
	public signOut(): void {
		console.log("logout ",);
		this.oAuthService.logOut();
	}

	/**
	 * Возвращает полученные требования о пользователе.
	 * @returns {object} Требования о пользователе
	 */
	public getClaims(): object {
		let claims = this.oAuthService.getIdentityClaims();
		return claims;
	}

	/** Делегаты tryLoginImplicitFlow  ради конкуренции */
	public async tryLogin() {
		await this.oAuthService.tryLogin();
	}

	/**
	 * проверка валидности токена
	 * @returns {boolean}
	 */
	hasValidAccessToken() {
		let valid = this.oAuthService.hasValidAccessToken();
		return valid;
	}

	/**
	 * Обновление токена
	 * @returns {Promise<void>}
	 */
	silentRefresh() {
		let silentRefresh = this.oAuthService.silentRefresh();
		console.log("silentRefresh ",silentRefresh);
	}
}

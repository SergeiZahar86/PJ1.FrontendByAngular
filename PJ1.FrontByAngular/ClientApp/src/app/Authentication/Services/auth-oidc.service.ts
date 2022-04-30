import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../authCodeFlowConfig";

@Injectable({
	providedIn: 'root'
})
export class AuthOidcService {

	constructor(private oAuthService: OAuthService) {
	}

	/** Загрузите документ Discovery и попробуйте войти в систему */
	public async loadConfigure(): Promise<void> {
		this.oAuthService.configure(authCodeFlowConfig);
		await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
	}

	/** Создаст тихое обновление токена, когда срок действия токена истекает. Когда пользователь
	 *  зарегистрирован по этому методу. 
	 *  Запускает поток кода авторизации и перенаправляет пользователю
	 *  на URL -адрес входа серверов Auth.
	 */
	public signIn(): void {
		console.log("login ",);
		this.oAuthService.setupAutomaticSilentRefresh();
		this.oAuthService.initCodeFlow();
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
		return this.oAuthService.getIdentityClaims();
	}

	
}

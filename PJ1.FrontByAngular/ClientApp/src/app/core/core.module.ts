import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from "./auth/auth.service";
import {
	AuthModule, OidcSecurityService, StsConfigLoader, StsConfigStaticLoader
} from "angular-auth-oidc-client";
import {ConfigService} from "./auth/config.service";

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
	declarations: [],
	imports: [
		CommonModule,
		AuthModule.forRoot({
			loader: {
				provide: StsConfigLoader,
				useFactory: authFactory,
				deps: [ConfigService],
			},
		})
	],
	providers: [
		AuthService,
		OidcSecurityService,
	]
})
export class CoreModule {}

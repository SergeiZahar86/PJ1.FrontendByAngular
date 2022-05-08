import {AuthConfigMy} from "./LibraryModels/AuthConfigMy";

export const authCodeFlowConfig: AuthConfigMy = {

//	issuer: 'https://idsvr4.azurewebsites.net',
	issuer: 'https://localhost:10001',
	redirectUri: window.location.origin + '/fetch-data',
	postLogoutRedirectUri: window.location.origin + '/fetch-data',
	silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
	clientId: 'client_angular',
	nonceStateSeparator : 'semicolon',
	//oidc: true, // ID_Token
	useSilentRefresh: true,
	silentRefreshTimeout: 10000,

	// Just needed if your auth server demands a secret. In general, this
	// is a sign that the auth server is not configured with SPAs in mind
	// and it might not enforce further best practices vital for security
	// such applications.
	//dummyClientSecret: "client_secret_swagger".ToSha256(),

	responseType: 'code',
	scope: 'openid profile SwaggerAPI',
	showDebugInformation: false,
};
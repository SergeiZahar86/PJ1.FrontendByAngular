import {AuthConfigMy} from "./LibraryModels/AuthConfigMy";

export const authCodeFlowConfig: AuthConfigMy = {

	
//	issuer: 'https://idsvr4.azurewebsites.net',
	issuer: 'https://localhost:10001',

	// URL of the SPA to redirect the user to after login
	redirectUri: window.location.origin + '/fetch-data',
	postLogoutRedirectUri: window.location.origin + '/fetch-data',
	silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

	// The SPA's id. The SPA is registerd with this id at the auth-server
	// clientId: 'server.code',
	//clientId: 'spa',
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

	// set the scope for the permissions the client should request
	// The first four are defined by OIDC.
	// Important: Request offline_access to get a refresh token
	// The api scope is a usecase specific one
	//scope: 'openid profile email offline_access api',
	scope: 'openid profile SwaggerAPI',

	showDebugInformation: false,
};
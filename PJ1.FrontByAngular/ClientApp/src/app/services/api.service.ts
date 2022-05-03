import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthOidcService} from "../Authentication/Services/auth-oidc.service";
import {OAuthStorage} from "angular-oauth2-oidc";
import {C} from "@angular/cdk/keycodes";

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private httpClient: HttpClient,
		private authOidcService: AuthOidcService,
		private authStorage: OAuthStorage) {

	}

	/** Получение всех пользователей (фейковых) */
	getAll(reportInfo?: any) {

//    let user = this.authService.currentUser;
//    let fff = `${user?.access_token}`;
//    let headers = new HttpHeaders(
//        {'Authorization': "Bearer " +`${user?.access_token}`});
//		let params = new HttpParams();
//		params = params.append('isForce', isForce.toString());
//    let result = this.httpClient.get("https://localhost:7001/Api/GetAll",
//        {
//          headers: headers
//          //params: params
//        });
//		let result = this.httpClient.get("https://localhost:7001/Api/GetAll")
//
//
//    return result;
		
		

//		let token = this.authOidcService.getAccessToken();
//		let headers = new HttpHeaders(
//        {'Authorization': "Bearer " +`${token}`});

		let token = this.authStorage.getItem('access_token');
		let token_22 = this.authOidcService.getAccessToken();
		let IdToken = this.authOidcService.getIdToken();
		let header = 'Bearer ' + token;
		let headers = new HttpHeaders();
		headers.set('Content-Type', 'application/json');
		headers.set('Authorization', header);

		console.log("claims ",this.authOidcService.getClaims());
		
		return this.httpClient.get("https://localhost:7001/Api/GetAll",
			{
          headers: headers
        });


	}


}

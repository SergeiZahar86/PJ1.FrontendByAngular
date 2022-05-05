import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthOidcService} from "../Authentication/Services/auth-oidc.service";
import {OAuthStorage} from "angular-oauth2-oidc";
import {C} from "@angular/cdk/keycodes";
import {AuthService} from "../core/auth/auth.service";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private httpClient: HttpClient,
		private authOidcService: AuthOidcService,
		private authStorage: OAuthStorage,
		private authService: AuthService) {

	}

	/** Получение всех пользователей (фейковых) */
	getAll(reportInfo?: any){

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

//		let token = this.authStorage.getItem('access_token');
//		let token_22 = this.authOidcService.getAccessToken();
//		this.authOidcService.getIdToken();
		
		// для AuthService
		let newToken = this.authService.getToken().subscribe(token =>{
			this.newToken = token;
		});
		
		// Для AuthOidcService
		let TK = this.authOidcService.getAccessToken();
		
//		let header = 'Bearer ' + this.newToken;
//		let headers = new HttpHeaders();
//		headers.set('Content-Type', 'application/json');
//		headers.set('Authorization', header);

		let headers = new HttpHeaders(
        {'Authorization': "Bearer " +`${TK}`});

		console.log("newToken ",TK);
		
		if(TK){
			return this.httpClient.get("https://localhost:7001/Api/GetAll",
				{
					headers: headers
				})
				.pipe(map(x => {
					return x;
				}),
					catchError( err => {
						console.log(err);
						return [];
					}));
		}else {
			const foo = new Observable(subscriber => {
				console.log('Nothing');
			});
			return foo;
		}


	}

	getUsers() : Observable<any> {
		return this.httpClient.get('assets/usersP.json').pipe(map((data:any)=>{
				let usersList = data["userList"];

				return usersList.map(function(user:any)  {
					return null;
				});
			}),
			catchError(err => {
				console.log(err);
				return [];
			}))
	};
	newToken: string | undefined;

}

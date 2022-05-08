import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthOidcService} from "../Authentication/Services/auth-oidc.service";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private httpClient: HttpClient,
		private authOidcService: AuthOidcService) {

	}

	/** Получение всех пользователей (фейковых) */
	getAll(){
		let TK = this.authOidcService.getAccessToken();
		let headers = new HttpHeaders({'Authorization': "Bearer " +`${TK}`});
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
}

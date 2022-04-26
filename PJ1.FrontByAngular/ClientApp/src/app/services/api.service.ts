import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private httpClient: HttpClient,
		private authService: AuthService) {
		
	}

	getAll(reportInfo?: any) {

		let user = this.authService.currentUser;
		let fff = `${user?.access_token}`;
		let headers = new HttpHeaders(
			{'Authorization': "Bearer " +`${user?.access_token}`});
//		let params = new HttpParams();
//		params = params.append('isForce', isForce.toString());
		let result = this.httpClient.get("https://localhost:7001/Api/GetAll",
			 {
				headers: headers
				//params: params
			});
//		let result = this.httpClient.get("https://localhost:7001/Api/GetAll")


		return result;

	}


}

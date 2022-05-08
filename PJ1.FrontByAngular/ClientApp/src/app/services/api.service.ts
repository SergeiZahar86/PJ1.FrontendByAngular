import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private httpClient: HttpClient) {

	}

	/** Получение всех пользователей (фейковых) */
	getAll() {
		return this.httpClient.get("https://localhost:7001/Api/GetAll")
		.pipe(map(x => {
				return x;
			}),
			catchError(err => {
				console.log(err);
				return [];
			}));


	}
}

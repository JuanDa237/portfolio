import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Api
import { environment } from '../../environments/environment';
import { Email } from '../models';

@Injectable({
	providedIn: 'root'
})
export class ContactMeService {
	private apiUrl: string;
	private headers: HttpHeaders;

	constructor(private http: HttpClient) {
		this.headers = new HttpHeaders().set('Content-type', 'application/json');
		this.apiUrl = environment.apiUrl;
	}

	public sendEmail(email: Email): Observable<any> {
		let params = JSON.stringify(email);
		return this.http.post(this.apiUrl + 'sendEmail', params, { headers: this.headers });
	}
}

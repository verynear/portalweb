import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import {User} from '../models/user';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable()
export class AuthenticationService {
  private url = environment.api.baseUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Promise<string> {
    return this.http.post(`${this.url}/login`, {username, password}, {observe: 'response'})
      .map((response: HttpResponse<any>) => response.headers.get('Authorization'))
      .toPromise();
  }

  logout(): Promise<any> {
    return this.http.post(`${this.url}/logout`, {})
      .toPromise()
      // ignore errors on logout
      .catch(() => {});
  }

  getCurrentUser(): Promise<User> {
    return this.http.get<User>(`${this.url}/auth/me`)
      .toPromise();
  }
}

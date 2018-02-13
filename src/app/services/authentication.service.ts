import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ConfigService} from './config.service';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
  private url: string;

  constructor(private http: HttpClient,
              private config: ConfigService) {
    this.url = config.get().api.baseURL;
  }

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

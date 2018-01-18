import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {MessageService} from './message.service';
import {PaymentService} from './payment.service';
import {MaintenanceService} from './maintenance.service';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private baseURL = environment.api.baseUrl;
  currentSiteId: number;

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getAll() {
    return this.http.get<User[]>(this.baseURL + '/users');
  }

  getById(id: number) {
    return this.http.get(this.baseURL + '/users/' + id)
      .map((response: Response) => response.json());
  }

  getRentalSites(user: User) {
    return this.http.get(this.baseURL + '/sites/');
  }

  create(user: User) {
    return this.http.post(this.baseURL + '/user/sign-up', user);
      // .map( (response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put(this.baseURL + '/users/' + user.id, user)
      .map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete(this.baseURL + '/users/' + id)
      .map((response: Response) => response.json());
  }

  getCurrentSiteId() {
    return this.currentSiteId;
  }

  setCurrentSiteId(data: number) {
    this.currentSiteId = data;
  }
}

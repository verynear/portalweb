import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {MessageService} from './message.service';
import {PaymentService} from './payment.service';
import {MaintenanceService} from './maintenance.service';

@Injectable()
export class UserService {
  private baseURL = environment.api.baseUrl;

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getAll() {
    return this.http.get<User[]>(this.baseURL + '/api/users');
  }

  getById(id: number) {
    return this.http.get(this.baseURL + '/api/users/' + id)
      .map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post(this.baseURL + '/api/users', user)
      .map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put(this.baseURL + '/api/users/' + user.id, user)
      .map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete(this.baseURL + '/api/users/' + id)
      .map((response: Response) => response.json());
  }
}

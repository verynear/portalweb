import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../models/user';
import {MessageService} from './message.service';
import {PaymentService} from './payment.service';
import {MaintenanceService} from './maintenance.service';

@Injectable()
export class UserService {
  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getAll() {
    return this.http.get<User[]>('/api/users');
  }

  getById(id: number) {
    return this.http.get('/api/users/' + id)
      .map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post('/api/users', user)
      .map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put('/api/users/' + user.id, user)
      .map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id)
      .map((response: Response) => response.json());
  }
}

import { Injectable } from '@angular/core';
import {Status} from '../models/status';
import { environment } from './../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StatusService {
  private url = `${environment.api.baseUrl}/`;

  constructor(private http: HttpClient) { }

  getStatus(): Promise<Status> {
    return this.http.get<Status>(this.url)
      .toPromise();
  }
}

import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Status} from '../models/status';
import { environment } from './../../environments/environment';

@Injectable()
export class StatusService {
  private url = `${environment.api.baseUrl}/`;

  constructor(private http: Http) { }

  getStatus(): Promise<Status> {
    return this.http.get(this.url)
      .toPromise()
      .then(res => res.json() as Status);
  }
}

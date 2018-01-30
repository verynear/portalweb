import { Injectable } from '@angular/core';
import {Status} from '../models/status';
import { ConfigService } from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StatusService {
  private url: string;

  constructor(private http: HttpClient,
              private config: ConfigService) {
    this.url = config.get().api.baseURL;
  }

  getStatus(): Promise<Status> {
    return this.http.get<Status>(this.url)
      .toPromise();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()
export class ActivityService {

  private baseURL: string;

  constructor(private http: HttpClient,
              private config: ConfigService) {

    this.baseURL = config.get().api.baseURL;
  }

  get() {
    return this.http.get<any[]>(this.baseURL + '/activities');
  }

}

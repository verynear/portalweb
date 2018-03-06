import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
import { Message } from '../models/message';

@Injectable()
export class ReportService {

  private baseURL: string;

  constructor(private http: HttpClient,  private config: ConfigService) {
    this.baseURL = config.get().api.baseURL;

  }

  messageReport(messageId) {
    return this.http.get<Message[]>(this.baseURL + '/messages/' + messageId + '/receipts/')
    .catch((error: any) => {
      return Observable.throw(this.errorHandler(error));
    });
  }

  buildingReport(buildingId) {
    return this.http.get<Message[]>(this.baseURL + '/messages/building/' + buildingId + '/report/')
    .catch((error: any) => {
      return Observable.throw(this.errorHandler(error));
    });
  }

  siteReport(siteId) {
    return this.http.get<Message[]>(this.baseURL + '/messages/' + siteId + '/report/')
    .catch((error: any) => {
      return Observable.throw(this.errorHandler(error));
    });
  }

  errorHandler(error: any): void {
    console.log('Error: ReportService');
    console.log(error);
  }
}

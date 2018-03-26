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

  messageReport(messageId: number) {
    return this.http.get<Message[]>(this.baseURL + '/messages/' + messageId + '/receipts/')
    .catch((error: any) => {
      return Observable.throw(this.errorHandler(error));
    });
  }

  buildingReport(buildingId: number) {
    return this.http.get<Message[]>(this.baseURL + '/messages/building/' + buildingId + '/report/')
    .catch((error: any) => {
      return Observable.throw(this.errorHandler(error));
    });
  }

  siteReport(siteId: number) {
    return this.http.get<Message[]>(this.baseURL + '/messages/' + siteId + '/report/')
    .catch((error: any) => {
      return Observable.throw(this.errorHandler(error));
    });
  }

  residentReport(residentId: number) {
    return this.http.get<Message[]>(this.baseURL + '/messages/building/unit/resident/' + residentId + '/report/')
    .catch((error: any) => {
      return Observable.throw(this.errorHandler(error));
    });
  }

  unitReport(unitId: number) {
    return this.http.get<Message[]>(this.baseURL + '/messages/building/unit/' + unitId + '/report/')
    .catch((error: any) => {
      return Observable.throw(this.errorHandler(error));
    });
  }

  errorHandler(error: any): void {
    console.log('Error: ReportService');
    console.log(error);
  }
}

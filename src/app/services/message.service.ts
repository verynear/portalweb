import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Message } from '../models/message';
import { Building } from '../models/building';
import { Tenant } from '../models/tenant';
import { Unit } from '../models/unit';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConfigService } from './config.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { SortService } from '../components/sortable-table/sort.service';

@Injectable()
export class MessageService {
  private baseURL: string;
  messages: Array<Message>;
  private _listeners = new Subject<any>();
  onSent$ = this._listeners.asObservable();

  onSent() {
    this._listeners.next();
  }

 constructor(private http: HttpClient, private sortService: SortService, private config: ConfigService) {
   console.log('message service: constructor');
   this.baseURL = config.get().api.baseURL;
  }

  get() {
    return this.http.get<Message[]>(this.baseURL + '/messages');
  }

  getSent(page, size) {
    return this.http.get<Message[]>(this.baseURL + '/messages?page=' + page + '&size=' + size);
  }

  getInquiry(page, size) {
    return this.http.get<Message[]>(this.baseURL + '/inquiry?page=' + page + '&size=' + size);
  }

  getSentAnnouncements() {
    return this.http.get<Message[]>(this.baseURL + '/announcements');
  }

  sortMessages (messages, criteria: MessageSearchCriteria): Message[] {
     return messages.sort((a, b) => {
      return this.sortService.sortHelper(a, b, criteria);
    });
  }

  sendMessage (message: Message) {
    return this.http.post(this.baseURL + '/messages', message);
  }

}

class MessageSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}




